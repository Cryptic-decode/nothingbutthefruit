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
        console.log(`Trying to resolve channel ID from: ${channelUrl}`);
        
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
            console.log(`✅ Successfully resolved channel ID for ${handle}: ${channelId}`);
            return channelId;
          }
        } else {
          console.log(`❌ Failed to fetch ${channelUrl}: ${response.status}`);
        }
      } catch (urlError) {
        console.log(`❌ Error fetching ${channelUrl}:`, urlError);
        continue;
      }
    }
    
    console.warn(`❌ Could not resolve channel ID for ${handle} from any URL format`);
    console.log(`💡 The channel might not exist yet or the handle might be different`);
    console.log(`💡 You can manually provide the channel ID if you know it`);
    
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
      console.log('Using manual channel ID override:', MANUAL_CHANNEL_ID);
      resolvedChannelId = MANUAL_CHANNEL_ID;
    }
    
    // If no channel ID provided, resolve it from the handle
    if (!resolvedChannelId || resolvedChannelId === 'UC_placeholder') {
      console.log('Resolving channel ID from handle...');
      resolvedChannelId = await resolveChannelId(CHANNEL_HANDLE);
    }
    
    if (!resolvedChannelId || resolvedChannelId === 'UC_placeholder') {
      console.log('No valid channel ID available, returning empty array');
      return [];
    }

    // Try YouTube Data API v3 first if API key is available
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (apiKey) {
      try {
        return await fetchVideosFromAPI(resolvedChannelId, apiKey, maxResults);
      } catch (apiError) {
        console.warn('YouTube Data API failed, falling back to RSS:', apiError);
        // Fall through to RSS fallback
      }
    } else {
      console.log('No YOUTUBE_API_KEY found, using RSS feed (limited to ~15 recent videos)');
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
async function fetchVideosFromAPI(channelId: string, apiKey: string, maxResults: number): Promise<YouTubeVideo[]> {
  const allVideos: YouTubeVideo[] = [];
  let nextPageToken: string | undefined = undefined;
  
  // Get channel details to find uploads playlist (only once)
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`;
  const channelResponse = await fetch(channelUrl, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!channelResponse.ok) {
    throw new Error(`Failed to fetch channel: ${channelResponse.status}`);
  }

  const channelData = await channelResponse.json();
  if (!channelData.items || channelData.items.length === 0) {
    throw new Error('Channel not found');
  }

  const uploadsPlaylistId = channelData.items[0].contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) {
    throw new Error('Could not find uploads playlist for channel');
  }

  // Fetch videos from uploads playlist with pagination
  do {

    // Fetch videos from uploads playlist
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
    
    const response = await fetch(playlistUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      break;
    }

    // Get video IDs to fetch duration details
    const videoIds = data.items.map((item: any) => item.contentDetails?.videoId).filter(Boolean);
    
    // Fetch video details to get duration (to filter Shorts)
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds.join(',')}&key=${apiKey}`;
    const videosResponse = await fetch(videosUrl, {
      next: { revalidate: 3600 },
    });

    if (!videosResponse.ok) {
      throw new Error(`Failed to fetch video details: ${videosResponse.status}`);
    }

    const videosData = await videosResponse.json();

    // Process videos and filter out Shorts
    for (const item of data.items) {
      const videoId = item.contentDetails?.videoId;
      if (!videoId) continue;

      // Find corresponding video details
      const videoDetails = videosData.items?.find((v: any) => v.id === videoId);
      if (!videoDetails) continue;

      // Check duration - Shorts are typically < 60 seconds
      const duration = videoDetails.contentDetails?.duration;
      if (duration) {
        const durationSeconds = parseDuration(duration);
        if (durationSeconds < 60) {
          // Skip Shorts
          continue;
        }
      }

      // Check if it's a Short by URL pattern (backup check)
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const isShort = item.snippet?.title?.toLowerCase().includes('#shorts') || 
                      item.snippet?.description?.toLowerCase().includes('#shorts');
      if (isShort) {
        continue;
      }

      const title = item.snippet?.title || 'Untitled';
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

  console.log(`Successfully fetched ${allVideos.length} full-length videos from YouTube Data API (Shorts excluded)`);
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
        
        // Skip YouTube Shorts (they have /shorts/ in the URL)
        if (alternateLink.includes('/shorts/')) {
          console.log(`Entry ${entryCount}: Skipping Short (${alternateLink})`);
          continue;
        }
        
        // Extract video ID from <yt:videoId>
        const videoIdMatch = entryXml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        if (!videoIdMatch) {
          console.warn(`Entry ${entryCount}: No video ID found, skipping`);
          continue;
        }
        
        const videoId = videoIdMatch[1];
        
        // Extract title
        const titleMatch = entryXml.match(/<title>([^<]+)<\/title>/);
        const title = titleMatch ? decodeHtmlEntities(titleMatch[1]) : 'Untitled';
        
        // Extract episode number from title (e.g., "Ep 11", "Episode 11", "Ep. 11")
        const episodeNumber = extractEpisodeNumber(title);
        
        // Extract description
        const descriptionMatch = entryXml.match(/<media:description>([^<]+)<\/media:description>/);
        const description = descriptionMatch ? decodeHtmlEntities(descriptionMatch[1]) : '';
        
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
    
    console.log(`Successfully parsed ${videos.length} full-length videos from RSS feed (Shorts excluded)`);
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
  // Try various patterns: "Ep 11", "Episode 11", "Ep. 11", "Ep11", "#11", etc.
  const patterns = [
    /(?:^|\s)(?:Ep|Episode|Ep\.)\s*(\d+)/i,  // "Ep 11", "Episode 11", "Ep. 11"
    /(?:^|\s)#(\d+)/i,                        // "#11"
    /(?:^|\s)Ep(\d+)/i,                       // "Ep11"
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
      console.log('Using manual channel ID override for channel info:', MANUAL_CHANNEL_ID);
      resolvedChannelId = MANUAL_CHANNEL_ID;
    }
    
    // If no channel ID provided, resolve it from the handle
    if (!resolvedChannelId || resolvedChannelId === 'UC_placeholder') {
      console.log('Resolving channel ID for channel info...');
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
