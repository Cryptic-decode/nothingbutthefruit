// YouTube Service for fetching channel videos
// Using RSS feed approach for simplicity and reliability

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  videoId: string;
  duration?: string;
  viewCount?: string;
  episodeNumber?: number; // Extracted from title (e.g., "Ep 11" → 11)
}

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
}

function debugLog(...args: unknown[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...args);
  }
}

/**
 * Episodes are videos that are explicitly labeled with an episode number in the title.
 * We intentionally exclude other uploads (promos, clips, Shorts, etc.) from the Episodes page.
 */
export function isEpisodeVideo(video: YouTubeVideo): video is YouTubeVideo & { episodeNumber: number } {
  if (typeof video.episodeNumber !== 'number' || Number.isNaN(video.episodeNumber)) return false;
  // Guardrail: prevent year hashtags like #2026 from being misread as episode numbers.
  // Episodes are expected to be a reasonably small positive integer.
  if (video.episodeNumber < 1 || video.episodeNumber > 500) return false;
  const title = (video.title || '').toLowerCase();

  // Exclude common non-episode patterns even if they accidentally contain numbers
  const excludedKeywords = ['promo', 'teaser', 'trailer', 'clip', 'shorts', '#shorts'];
  if (excludedKeywords.some((k) => title.includes(k))) return false;

  return true;
}

export async function fetchChannelEpisodes(channelId?: string, maxResults: number = 200): Promise<YouTubeVideo[]> {
  const videos = await fetchChannelVideos(channelId, maxResults);
  return videos.filter(isEpisodeVideo);
}

// Channel handle to ID mapping (we'll resolve this)
const CHANNEL_HANDLE = '@nothingbutthefruit';

// Manual channel ID override (uncomment and set if you know the channel ID)
// To get your channel ID: Go to https://www.youtube.com/@nothingbutthefruit, right-click -> View Source, search for "channelId"
const MANUAL_CHANNEL_ID = 'UCLWe0BfP-ZPGW-TJseapbjA';

/**
 * Resolves YouTube channel handle to channel ID
 * Uses multiple approaches to find the channel ID
 */
export async function resolveChannelId(handle: string): Promise<string> {
  try {
    // Remove @ symbol if present
    const cleanHandle = handle.replace('@', '');
    
    // Try multiple URL formats
    const urlsToTry = [
      `https://www.youtube.com/@${cleanHandle}`,
      `https://www.youtube.com/c/${cleanHandle}`,
      `https://www.youtube.com/user/${cleanHandle}`,
      `https://www.youtube.com/channel/${cleanHandle}`,
    ];

    for (const channelUrl of urlsToTry) {
      try {
        debugLog(`Trying to resolve channel ID from: ${channelUrl}`);
        
        const response = await fetch(channelUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; NothingButTheFruit-Website/1.0)',
          },
        });

        if (response.ok) {
          const html = await response.text();
          
          // Extract channel ID from the page HTML
          const channelIdMatch = html.match(/"channelId":"(UC[a-zA-Z0-9_-]{22})"/) ||
                                html.match(/"externalId":"(UC[a-zA-Z0-9_-]{22})"/) ||
                                html.match(/channelId=([UCa-zA-Z0-9_-]{24})/);
          
          if (channelIdMatch && channelIdMatch[1]) {
            const channelId = channelIdMatch[1];
            debugLog(`Successfully resolved channel ID for ${handle}: ${channelId}`);
            return channelId;
          }
        } else {
          debugLog(`Failed to fetch ${channelUrl}: ${response.status}`);
        }
      } catch (urlError) {
        debugLog(`Error fetching ${channelUrl}:`, urlError);
        continue;
      }
    }
    
    console.warn(`❌ Could not resolve channel ID for ${handle} from any URL format`);
    debugLog('The channel might not exist yet or the handle might be different');
    debugLog('You can manually provide the channel ID if you know it');
    
    return 'UC_placeholder';
    
  } catch (error) {
    console.error(`❌ Error resolving channel ID for ${handle}:`, error);
    return 'UC_placeholder';
  }
}

/**
 * Fetches videos from YouTube channel using Data API v3 (with RSS fallback)
 * Automatically resolves channel ID if not provided
 * Filters out Shorts (videos < 60 seconds)
 */
export async function fetchChannelVideos(channelId?: string, maxResults: number = 50): Promise<YouTubeVideo[]> {
  try {
    let resolvedChannelId = channelId;
    
    // Check for manual override first
    if (MANUAL_CHANNEL_ID) {
      debugLog('Using manual channel ID override:', MANUAL_CHANNEL_ID);
      resolvedChannelId = MANUAL_CHANNEL_ID;
    }
    
    // If no channel ID provided, resolve it from the handle
    if (!resolvedChannelId || resolvedChannelId === 'UC_placeholder') {
      debugLog('Resolving channel ID from handle...');
      resolvedChannelId = await resolveChannelId(CHANNEL_HANDLE);
    }
    
    if (!resolvedChannelId || resolvedChannelId === 'UC_placeholder') {
      debugLog('No valid channel ID available, returning empty array');
      return [];
    }

    // Try YouTube Data API v3 first if API key is available
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (apiKey) {
      debugLog('YOUTUBE_API_KEY found, attempting to use YouTube Data API v3');
      debugLog(`Channel ID: ${resolvedChannelId}`);
      try {
        const siteUrl = getSiteUrlForApiReferrer();
        if (siteUrl) {
          debugLog(`Using Referer header for YouTube API: ${siteUrl}`);
        } else {
          console.warn('⚠️ No SITE_URL/NEXT_PUBLIC_SITE_URL set; YouTube API keys restricted by HTTP referrer may fail');
        }

        const videos = await fetchVideosFromAPI(resolvedChannelId, apiKey, maxResults, siteUrl);
        if (videos.length === 0) {
          console.warn('⚠️ API returned 0 videos, falling back to RSS feed');
        } else {
          debugLog(`Successfully fetched ${videos.length} videos from YouTube Data API`);
          return videos;
        }
      } catch (apiError: unknown) {
        const error = apiError instanceof Error ? apiError : new Error(String(apiError));
        console.error('❌ YouTube Data API failed:', error.message);
        if (error.stack) {
          console.error('Stack trace:', error.stack);
        }
        console.warn('⚠️ Falling back to RSS feed...');
        // Fall through to RSS fallback
      }
    } else {
      debugLog('No YOUTUBE_API_KEY found; using the RSS feed');
    }

    // Fallback to RSS feed
    return await fetchVideosFromRSS(resolvedChannelId);
    
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    
    // Return empty array for graceful degradation
    return [];
  }
}

/**
 * Fetches videos using YouTube Data API v3
 */
async function fetchVideosFromAPI(
  channelId: string,
  apiKey: string,
  maxResults: number,
  referrer?: string
): Promise<YouTubeVideo[]> {
  const allVideos: YouTubeVideo[] = [];
  let nextPageToken: string | undefined = undefined;

  const googleApiHeaders: HeadersInit = referrer ? { Referer: referrer } : {};
  
  // Get channel details to find uploads playlist (only once)
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`;
  debugLog(`Fetching channel details for: ${channelId}`);
  
  const channelResponse = await fetch(channelUrl, {
    next: { revalidate: 3600 }, // Cache for 1 hour
    headers: googleApiHeaders,
  });

  if (!channelResponse.ok) {
    const errorText = await channelResponse.text();
    console.error(`❌ Channel API error (${channelResponse.status}):`, errorText);
    throw new Error(`Failed to fetch channel: ${channelResponse.status} - ${errorText}`);
  }

  const channelData = await channelResponse.json();
  
  // Check for API errors in response
  if (channelData.error) {
    console.error('❌ YouTube API Error:', JSON.stringify(channelData.error, null, 2));
    throw new Error(`YouTube API Error: ${channelData.error.message || 'Unknown error'}`);
  }
  
  if (!channelData.items || channelData.items.length === 0) {
    throw new Error(`Channel not found: ${channelId}`);
  }
  
  debugLog('Channel found, getting uploads playlist...');

  const uploadsPlaylistId = channelData.items[0].contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) {
    throw new Error('Could not find uploads playlist for channel');
  }

  // Fetch videos from uploads playlist with pagination
  do {

    // Fetch videos from uploads playlist
    const playlistUrl: string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
    
    const response = await fetch(playlistUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: googleApiHeaders,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Playlist API error (${response.status}):`, errorText);
      throw new Error(`Failed to fetch videos: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Check for API errors
    if (data.error) {
      console.error('❌ YouTube API Error:', JSON.stringify(data.error, null, 2));
      throw new Error(`YouTube API Error: ${data.error.message || 'Unknown error'}`);
    }

    if (!data.items || data.items.length === 0) {
      debugLog('No more videos in playlist');
      break;
    }
    
    debugLog(`Fetched ${data.items.length} playlist items`);

    // Get video IDs to fetch duration details
    interface PlaylistItem {
      contentDetails?: { videoId?: string };
    }
    const videoIds = (data.items as PlaylistItem[]).map((item) => item.contentDetails?.videoId).filter(Boolean) as string[];
    
    // Fetch video details to get duration (to filter Shorts)
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds.join(',')}&key=${apiKey}`;
    const videosResponse = await fetch(videosUrl, {
      next: { revalidate: 3600 },
      headers: googleApiHeaders,
    });

    if (!videosResponse.ok) {
      const errorText = await videosResponse.text();
      console.error(`❌ Videos API error (${videosResponse.status}):`, errorText);
      throw new Error(`Failed to fetch video details: ${videosResponse.status} - ${errorText}`);
    }

    const videosData = await videosResponse.json();
    
    // Check for API errors
    if (videosData.error) {
      console.error('❌ YouTube Videos API Error:', JSON.stringify(videosData.error, null, 2));
      throw new Error(`YouTube API Error: ${videosData.error.message || 'Unknown error'}`);
    }

    // Process videos and filter out Shorts
    let shortsFiltered = 0;
    for (const item of data.items) {
      const videoId = item.contentDetails?.videoId;
      if (!videoId) continue;

      // Find corresponding video details
      interface VideoItem {
        id: string;
        contentDetails?: { duration?: string };
        snippet?: {
          thumbnails?: {
            default?: { width?: number; height?: number };
            maxres?: { width?: number; height?: number };
          };
        };
      }
      const videoDetails = (videosData.items as VideoItem[] | undefined)?.find((v) => v.id === videoId);
      if (!videoDetails) continue;

      // Comprehensive Shorts detection
      const title = item.snippet?.title || '';
      const description = item.snippet?.description || '';
      const isShort = isYouTubeShort(videoDetails, title, description);
      
      if (isShort) {
        shortsFiltered++;
        continue;
      }

      const episodeNumber = extractEpisodeNumber(title);

      allVideos.push({
        id: videoId,
        title,
        description: item.snippet?.description || '',
        publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
        thumbnail: {
          url: item.snippet?.thumbnails?.maxres?.url || 
               item.snippet?.thumbnails?.high?.url || 
               item.snippet?.thumbnails?.default?.url || 
               `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          width: item.snippet?.thumbnails?.maxres?.width || 1280,
          height: item.snippet?.thumbnails?.maxres?.height || 720,
        },
        videoId,
        episodeNumber,
      });
    }

    nextPageToken = data.nextPageToken;
    debugLog(`Processed page: ${allVideos.length} full videos, ${shortsFiltered} Shorts filtered`);
    
    // Stop if we have enough videos or no more pages
    if (allVideos.length >= maxResults || !nextPageToken) {
      break;
    }

  } while (nextPageToken && allVideos.length < maxResults);

  // Sort videos: by episode number (descending), then by published date (descending)
  allVideos.sort((a, b) => {
    if (a.episodeNumber && b.episodeNumber) {
      return b.episodeNumber - a.episodeNumber;
    }
    if (a.episodeNumber && !b.episodeNumber) {
      return -1;
    }
    if (!a.episodeNumber && b.episodeNumber) {
      return 1;
    }
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  debugLog(`Fetched ${allVideos.length} full-length videos from YouTube Data API`);
  return allVideos;
}

/**
 * Fetches videos from RSS feed (fallback method)
 */
async function fetchVideosFromRSS(channelId: string): Promise<YouTubeVideo[]> {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    
    const response = await fetch(rssUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'User-Agent': 'NothingButTheFruit-Website/1.0',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn('Channel not found or no videos available');
        return [];
      }
      throw new Error(`Failed to fetch videos: ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();
    
    if (!xmlText || xmlText.trim().length === 0) {
      console.warn('Empty response from YouTube RSS feed');
      return [];
    }

    return parseRSSFeed(xmlText);
}

/**
 * Comprehensive Shorts detection - checks multiple indicators
 */
interface VideoDetailsForShorts {
  contentDetails?: { duration?: string };
  snippet?: {
    thumbnails?: {
      default?: { width?: number; height?: number };
    };
  };
}

function isYouTubeShort(
  videoDetails: VideoDetailsForShorts,
  title: string,
  description: string
): boolean {
  const titleLower = title.toLowerCase();
  const descLower = description.toLowerCase();
  
  // 1. Check duration - Shorts are typically < 65 seconds (allowing small buffer)
  const duration = videoDetails.contentDetails?.duration;
  if (duration) {
    const durationSeconds = parseDuration(duration);
    if (durationSeconds < 65) {
      return true;
    }
  }
  
  // 2. Check for #shorts hashtag in title or description
  if (titleLower.includes('#shorts') || descLower.includes('#shorts')) {
    return true;
  }
  
  // 3. Check for "shorts" keyword in title (common pattern)
  if (titleLower.includes('shorts') && !titleLower.includes('episode')) {
    return true;
  }
  
  // 4. Check video dimensions - Shorts are typically vertical (9:16 aspect ratio)
  const thumbnails = videoDetails.snippet?.thumbnails;
  if (thumbnails?.default) {
    const width = thumbnails.default.width || 0;
    const height = thumbnails.default.height || 0;
    if (width > 0 && height > 0) {
      const aspectRatio = width / height;
      // Shorts are vertical (height > width), typically around 0.5625 (9:16)
      if (aspectRatio < 0.7 && height > width) {
        // Additional check: if it's very short duration AND vertical, it's likely a Short
        if (duration) {
          const durationSeconds = parseDuration(duration);
          if (durationSeconds < 90) {
            return true;
          }
        }
      }
    }
  }
  
  // 5. Check if video URL pattern suggests it's a Short (backup)
  // This shouldn't happen with API, but good to check
  
  return false;
}

/**
 * Parses ISO 8601 duration string (e.g., "PT1M30S") to seconds
 */
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Returns a stable site URL to use as the HTTP Referer header for Google APIs.
 * This is only needed if your Google API key is restricted by HTTP referrer.
 */
function getSiteUrlForApiReferrer(): string | undefined {
  const raw =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (!raw) return undefined;

  // Ensure it looks like a full URL
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;

  return `https://${raw}`;
}

/**
 * Parses YouTube RSS feed XML to extract video data
 */
function parseRSSFeed(xmlText: string): YouTubeVideo[] {
  try {
    // This is a simplified parser - in production, use a proper XML parser like xml2js
    const videos: YouTubeVideo[] = [];
    
    // Validate XML structure
    if (!xmlText.includes('<entry>') || !xmlText.includes('</entry>')) {
      console.warn('No video entries found in RSS feed');
      return [];
    }
    
    // Extract video entries from RSS feed
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;
    let entryCount = 0;
    
    while ((match = entryRegex.exec(xmlText)) !== null) {
      entryCount++;
      const entryXml = match[1];
      
      try {
        // Extract alternate link to check if it's a Short
        const linkMatch = entryXml.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"/);
        const alternateLink = linkMatch ? linkMatch[1] : '';
        
        // Extract title for additional Shorts detection
        const titleMatch = entryXml.match(/<title>([^<]+)<\/title>/);
        const title = titleMatch ? decodeHtmlEntities(titleMatch[1]) : '';
        
        // Extract description
        const descriptionMatch = entryXml.match(/<media:description>([^<]+)<\/media:description>/);
        const description = descriptionMatch ? decodeHtmlEntities(descriptionMatch[1]) : '';
        
        // Skip YouTube Shorts - check multiple indicators
        const isShort = alternateLink.includes('/shorts/') ||
                       title.toLowerCase().includes('#shorts') ||
                       description.toLowerCase().includes('#shorts') ||
                       (title.toLowerCase().includes('shorts') && !title.toLowerCase().includes('episode'));
        
        if (isShort) {
          debugLog(`Skipping Short in RSS entry ${entryCount}`);
          continue;
        }
        
        // Extract video ID from <yt:videoId>
        const videoIdMatch = entryXml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        if (!videoIdMatch) {
          console.warn(`Entry ${entryCount}: No video ID found, skipping`);
          continue;
        }
        
        const videoId = videoIdMatch[1];
        
        // Extract episode number from title (e.g., "Ep 11", "Episode 11", "Ep. 11")
        const episodeNumber = extractEpisodeNumber(title);
        
        // Extract published date
        const publishedMatch = entryXml.match(/<published>([^<]+)<\/published>/);
        const publishedAt = publishedMatch ? publishedMatch[1] : new Date().toISOString();
        
        // Extract thumbnail
        const thumbnailMatch = entryXml.match(/<media:thumbnail url="([^"]+)" width="(\d+)" height="(\d+)"/);
        const thumbnail = thumbnailMatch ? {
          url: thumbnailMatch[1],
          width: parseInt(thumbnailMatch[2]),
          height: parseInt(thumbnailMatch[3])
        } : {
          url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          width: 1280,
          height: 720
        };
        
        videos.push({
          id: videoId,
          title,
          description,
          publishedAt,
          thumbnail,
          videoId,
          episodeNumber
        });
        
      } catch (entryError) {
        console.warn(`Entry ${entryCount}: Error parsing entry:`, entryError);
        continue;
      }
    }
    
    // Sort videos: by episode number (descending), then by published date (descending)
    videos.sort((a, b) => {
      // If both have episode numbers, sort by episode number descending
      if (a.episodeNumber && b.episodeNumber) {
        return b.episodeNumber - a.episodeNumber;
      }
      // If only one has an episode number, prioritize it
      if (a.episodeNumber && !b.episodeNumber) {
        return -1;
      }
      if (!a.episodeNumber && b.episodeNumber) {
        return 1;
      }
      // If neither has episode number, sort by published date descending
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
    
    // Sort videos: by episode number (descending), then by published date (descending)
    videos.sort((a, b) => {
      if (a.episodeNumber && b.episodeNumber) {
        return b.episodeNumber - a.episodeNumber;
      }
      if (a.episodeNumber && !b.episodeNumber) {
        return -1;
      }
      if (!a.episodeNumber && b.episodeNumber) {
        return 1;
      }
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
    
    debugLog(`Parsed ${videos.length} full-length videos from the RSS feed`);
    return videos;
    
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
}

/**
 * Extracts episode number from video title
 * Supports formats like "Ep 11", "Episode 11", "Ep. 11", "Ep11", etc.
 */
function extractEpisodeNumber(title: string): number | undefined {
  // Only match explicit episode labeling. Avoid generic hashtags like #2026.
  // Supported: "Ep 11", "Episode 11", "Ep. 11", "Ep11"
  const patterns = [
    /\b(?:ep|episode)\.?\s*(\d{1,3})\b/i, // "Ep 11", "Episode 11", "Ep. 11"
    /\bep(\d{1,3})\b/i,                   // "Ep11"
  ];
  
  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > 0) {
        return num;
      }
    }
  }
  
  return undefined;
}

/**
 * Decodes HTML entities in text
 */
function decodeHtmlEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };
  
  return text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
    return entities[entity] || entity;
  });
}

/**
 * Gets channel information
 * Automatically resolves channel ID if not provided
 */
export async function getChannelInfo(channelId?: string): Promise<YouTubeChannel | null> {
  try {
    let resolvedChannelId = channelId;
    
    // Check for manual override first
    if (MANUAL_CHANNEL_ID) {
      debugLog('Using manual channel ID override for channel info:', MANUAL_CHANNEL_ID);
      resolvedChannelId = MANUAL_CHANNEL_ID;
    }
    
    // If no channel ID provided, resolve it from the handle
    if (!resolvedChannelId || resolvedChannelId === 'UC_placeholder') {
      debugLog('Resolving channel ID for channel info...');
      resolvedChannelId = await resolveChannelId(CHANNEL_HANDLE);
    }
    
    if (!resolvedChannelId || resolvedChannelId === 'UC_placeholder') {
      // Return default channel info as fallback
      return {
        id: 'UC_placeholder',
        title: 'Nothing But The Fruit',
        description: 'Gospel podcast with Pastor Demetria Bass',
        customUrl: '@NothingButTheFruit',
        publishedAt: new Date().toISOString()
      };
    }

    // In production, use YouTube Data API to get detailed channel info
    // For now, return basic info
    return {
      id: resolvedChannelId,
      title: 'Nothing But The Fruit',
      description: 'Gospel podcast with Pastor Demetria Bass',
      customUrl: '@NothingButTheFruit',
      publishedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching channel info:', error);
    return null;
  }
}

/**
 * Formats date for display
 */
export function formatVideoDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return 'Unknown date';
  }
}

/**
 * Truncates text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
