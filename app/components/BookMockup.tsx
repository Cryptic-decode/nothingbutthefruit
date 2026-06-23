import Image from 'next/image';

interface BookMockupProps {
  src: string;
  alt: string;
  aspect?: 'portrait' | 'landscape';
  priority?: boolean;
  sizes?: string;
  className?: string;
  spine?: 'left' | 'right';
}

export default function BookMockup({
  src,
  alt,
  aspect = 'portrait',
  priority,
  sizes,
  className = '',
  spine = 'right',
}: BookMockupProps) {
  const isPortrait = aspect === 'portrait';

  return (
    <div
      className={`group relative ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Shadow on the surface behind the book */}
      <div
        className={`absolute inset-0 rounded-sm opacity-40 blur-xl transition-all duration-500 group-hover:opacity-60 ${
          isPortrait ? 'bg-black/40' : 'bg-black/30'
        }`}
        style={{
          transform: spine === 'right' ? 'translateX(12px) translateY(12px)' : 'translateX(-12px) translateY(12px)',
        }}
      />

      {/* The book itself */}
      <div
        className="relative w-full h-full transition-transform duration-500 group-hover:scale-[1.02]"
        style={{
          transform:
            spine === 'right'
              ? 'rotateY(-6deg)'
              : 'rotateY(6deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Book block */}
        <div
          className={`relative w-full h-full overflow-hidden ${
            isPortrait
              ? 'rounded-[2px_4px_4px_2px]'
              : 'rounded-[3px]'
          }`}
          style={{
            boxShadow: isPortrait
              ? // Portrait: thick book with deep shadow
                `-1px 0 0 0 rgba(0,0,0,0.12),
                 0 1px 0 0 rgba(0,0,0,0.08),
                 2px 2px 0 0 #f5f5f5,
                 4px 4px 0 0 #eeeeee,
                 6px 6px 0 0 #e8e8e8,
                 8px 8px 12px rgba(0,0,0,0.25),
                 12px 12px 24px rgba(0,0,0,0.15)`
              : // Landscape: thinner, lighter shadow
                `1px 1px 0 0 rgba(0,0,0,0.08),
                 0 0 0 1px rgba(0,0,0,0.04),
                 4px 4px 8px rgba(0,0,0,0.2),
                 8px 8px 20px rgba(0,0,0,0.12)`,
          }}
        >
          {/* Cover Image */}
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-contain ${
              isPortrait ? 'p-1' : 'p-0'
            }`}
            priority={priority}
            sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
          />

          {/* Subtle cover sheen overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.04) 100%)',
            }}
          />

          {/* Spine effect - dark gradient on the spine side */}
          <div
            className="absolute inset-y-0 w-1/4 pointer-events-none"
            style={{
              [spine === 'right' ? 'left' : 'right']: 0,
              background:
                spine === 'right'
                  ? 'linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, transparent 100%)'
                  : 'linear-gradient(to left, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, transparent 100%)',
              borderRadius: spine === 'right' ? '2px 0 0 2px' : '0 2px 2px 0',
            }}
          />

          {/* Page edge effect on the opposite side */}
          {isPortrait && (
            <div
              className="absolute inset-y-[2px] w-[6px] pointer-events-none"
              style={{
                [spine === 'right' ? 'right' : 'left']: -6,
                background:
                  'linear-gradient(to right, #e8e8e8 0%, #f0f0f0 50%, #f5f5f5 100%)',
                borderRadius: '0 1px 1px 0',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
