import Link from 'next/link';

interface SubscribeProps {
  variant?: 'horizontal' | 'vertical';
  className?: string;
}

export default function Subscribe({ variant = 'horizontal', className = '' }: SubscribeProps) {
  const platforms = [
    {
      name: 'YouTube',
      url: 'https://youtube.com/@nothingbutthefruit?sub_confirmation=1',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      bgColor: 'bg-red-600 hover:bg-red-700',
    },
    // Future platforms can be added here (Spotify, Apple Podcasts, etc.)
  ];

  if (variant === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscribe & Follow</h3>
        {platforms.map((platform) => (
          <Link
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-3 ${platform.bgColor} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
          >
            {platform.icon}
            <span>{platform.name}</span>
          </Link>
        ))}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`flex flex-wrap gap-4 justify-center ${className}`}>
      {platforms.map((platform) => (
        <Link
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-3 ${platform.bgColor} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
        >
          {platform.icon}
          <span>Subscribe on {platform.name}</span>
        </Link>
      ))}
    </div>
  );
}

