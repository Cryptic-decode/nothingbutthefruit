'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { BookDisplayVariant } from '../lib/books';

interface BookMockupProps {
  src: string;
  alt: string;
  variant?: BookDisplayVariant;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export default function BookMockup({
  src,
  alt,
  variant = 'constructed',
  priority,
  sizes,
  className = '',
}: BookMockupProps) {
  if (variant === 'rendered' || variant === 'landscape') {
    return (
      <motion.div
        className={`relative w-full h-full ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 250, damping: 18 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain drop-shadow-2xl"
          priority={priority}
          sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
        />
      </motion.div>
    );
  }

  const pageColor1 = '#f0ebe3';
  const pageColor2 = '#e8e2d8';
  const pageColor3 = '#ddd7cc';
  const pageColor4 = '#d5cfc5';
  const pageShadow = 'rgba(0,0,0,0.08)';

  const pageWidth = 7;
  const bottomPageHeight = 5;

  return (
    <motion.div
      className={`group relative ${className}`}
      style={{ perspective: '1200px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
    >
      <div
        className="absolute inset-0 rounded-sm blur-xl transition-opacity duration-300 group-hover:opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 50% 80%, rgba(0,0,0,0.3) 0%, transparent 70%)',
          transform: `translate(-6px, ${bottomPageHeight + 6}px) scale(0.92)`,
          opacity: 0.35,
        }}
      />

      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(3deg)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <div
          className="absolute rounded-sm pointer-events-none"
          style={{
            left: '2px',
            right: `${pageWidth + 2}px`,
            bottom: -bottomPageHeight,
            height: bottomPageHeight,
            background: `linear-gradient(to bottom, ${pageColor1}, ${pageColor2})`,
            borderBottom: `1px solid ${pageColor4}`,
            boxShadow: `0 ${bottomPageHeight}px ${bottomPageHeight * 2}px ${pageShadow}`,
          }}
        />
        <div
          className="absolute rounded-sm pointer-events-none"
          style={{
            left: '3px',
            right: `${pageWidth + 1}px`,
            bottom: -(bottomPageHeight - 0.5),
            height: bottomPageHeight - 0.5,
            background: `linear-gradient(to bottom, ${pageColor2}, ${pageColor3})`,
          }}
        />
        <div
          className="absolute rounded-sm pointer-events-none overflow-hidden"
          style={{
            left: '2px',
            right: `${pageWidth + 2}px`,
            bottom: -(bottomPageHeight - 1),
            height: bottomPageHeight - 1,
            opacity: 0.3,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                'repeating-linear-gradient(to bottom, transparent 0px, transparent 1.5px, rgba(0,0,0,0.06) 1.5px, rgba(0,0,0,0.06) 2px)',
            }}
          />
        </div>

        <div
          className="absolute inset-y-0 rounded-sm pointer-events-none"
          style={{
            left: -pageWidth,
            width: pageWidth,
          }}
        >
          <div
            className="absolute inset-0 rounded-sm"
            style={{
              background: `linear-gradient(to right, ${pageColor1} 0%, ${pageColor2} 40%, ${pageColor3} 100%)`,
              borderRadius: '1px 0 0 1px',
              boxShadow:
                '1px 0 2px rgba(0,0,0,0.06), inset 1px 0 1px rgba(255,255,255,0.3)',
            }}
          />
          <div className="absolute inset-0 overflow-hidden rounded-sm" style={{ opacity: 0.25 }}>
            <div
              className="w-full h-full"
              style={{
                background:
                  'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 2.5px)',
                maskImage:
                  'linear-gradient(to bottom, transparent 8%, black 20%, black 80%, transparent 92%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 8%, black 20%, black 80%, transparent 92%)',
              }}
            />
          </div>
        </div>

        <div
          className="absolute rounded-sm pointer-events-none"
          style={{
            left: -pageWidth,
            bottom: -bottomPageHeight,
            width: pageWidth,
            height: bottomPageHeight,
            background: pageColor3,
            borderRadius: '0 0 0 1px',
            boxShadow: 'inset 0 0 2px rgba(0,0,0,0.05)',
          }}
        />

        <div
          className="relative w-full h-full overflow-hidden rounded-sm"
          style={{
            zIndex: 2,
            boxShadow: `0 1px 3px rgba(0,0,0,0.1),
                 -2px 2px 4px rgba(0,0,0,0.08),
                 -6px 6px 16px rgba(0,0,0,0.12)`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            priority={priority}
            sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%, transparent 60%, rgba(0,0,0,0.03) 100%)',
            }}
          />

          <div
            className="absolute inset-y-0 w-[20%] left-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.04) 70%, transparent 100%)',
            }}
          />

          <div
            className="absolute inset-y-0 w-[3px] left-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.08) 0%, transparent 100%)',
            }}
          />

          <div
            className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.15) 0%, transparent 80%)',
            }}
          />
          <div
            className="absolute top-0 left-0 bottom-0 w-[1px] pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 60%)',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
