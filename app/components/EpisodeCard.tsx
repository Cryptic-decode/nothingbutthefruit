import Link from 'next/link';
import YouTubeEmbed from './YouTubeEmbed';
import { YouTubeVideo, formatVideoDate, truncateText } from '../lib/youtubeService';

interface EpisodeCardProps {
  episode: YouTubeVideo;
  episodeNumber?: number;
}

export default function EpisodeCard({ episode, episodeNumber }: EpisodeCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
      {/* Video Embed */}
      <div className="relative">
        <YouTubeEmbed 
          videoId={episode.videoId}
          title={episode.title}
        />
      </div>

      {/* Episode Info */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-3">
          {episodeNumber && (
            <span className="inline-block bg-brand-gold text-brand-black font-bold px-3 py-1 rounded-full text-xs">
              Episode {episodeNumber}
            </span>
          )}
          <span className="text-gray-500 text-xs">
            {formatVideoDate(episode.publishedAt)}
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {episode.title}
        </h2>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
          {truncateText(episode.description, 150)}
        </p>

        <Link
          href={`https://youtube.com/watch?v=${episode.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-brand-black hover:bg-gray-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
        >
          <span className="flex items-center">
            Watch on YouTube
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
