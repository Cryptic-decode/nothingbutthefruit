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
}

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
}

// Channel handle to ID mapping (we'll resolve this)
const CHANNEL_HANDLE = '@NothingButTheFruit';
const CHANNEL_ID = 'UC_placeholder'; // Will be resolved

/**
 * Resolves YouTube channel handle to channel ID
 * Uses a direct approach to fetch channel ID from the channel page
 */
export async function resolveChannelId(handle: string): Promise<string> {
  try {
    // Remove @ symbol if present
    const cleanHandle = handle.replace('@', '');
    
    // Try to fetch the channel page to extract the channel ID
    const channelUrl = `https://www.youtube.com/${cleanHandle}`;
    
    const response = await fetch(channelUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NothingButTheFruit-Website/1.0)',
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch channel page for ${handle}: ${response.status}`);
      return 'UC_placeholder';
    }

    const html = await response.text();
    
    // Extract channel ID from the page HTML
    // Look for patterns like "channelId":"UC..." or "externalId":"UC..."
    const channelIdMatch = html.match(/"channelId":"(UC[a-zA-Z0-9_-]{22})"/) ||
                          html.match(/"externalId":"(UC[a-zA-Z0-9_-]{22})"/) ||
                          html.match(/channelId=([UCa-zA-Z0-9_-]{24})/);
    
    if (channelIdMatch && channelIdMatch[1]) {
      const channelId = channelIdMatch[1];
      console.log(`Successfully resolved channel ID for ${handle}: ${channelId}`);
      return channelId;
    }
    
    console.warn(`Could not find channel ID in page for ${handle}`);
    return 'UC_placeholder';
    
  } catch (error) {
    console.error(`Error resolving channel ID for ${handle}:`, error);
    return 'UC_placeholder';
  }
}

/**
 * Fetches latest videos from YouTube channel RSS feed
 * Automatically resolves channel ID if not provided
 */
export async function fetchChannelVideos(channelId?: string): Promise<YouTubeVideo[]> {
  try {
    let resolvedChannelId = channelId;
    
    // If no channel ID provided, resolve it from the handle
    if (!resolvedChannelId || resolvedChannelId === 'UC_placeholder') {
      console.log('Resolving channel ID from handle...');
      resolvedChannelId = await resolveChannelId(CHANNEL_HANDLE);
    }
    
    if (!resolvedChannelId || resolvedChannelId === 'UC_placeholder') {
      console.log('No valid channel ID available, returning empty array');
      return [];
    }

    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${resolvedChannelId}`;
    
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
    
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    
    // Return empty array for graceful degradation
    // In production, you might want to log this to an error tracking service
    return [];
  }
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
          videoId
        });
        
      } catch (entryError) {
        console.warn(`Entry ${entryCount}: Error parsing entry:`, entryError);
        continue;
      }
    }
    
    console.log(`Successfully parsed ${videos.length} videos from RSS feed`);
    return videos;
    
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
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
