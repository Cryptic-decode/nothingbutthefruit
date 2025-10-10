'use client';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

export default function YouTubeEmbed({ videoId, title = 'YouTube video player', className = '' }: YouTubeEmbedProps) {
  return (
    <div className={`relative w-full pt-[56.25%] ${className}`}>
      <iframe
        className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl"
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
