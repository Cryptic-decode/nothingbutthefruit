'use client';

import Link from 'next/link';
import type { Book } from '../lib/books';
import { motion } from 'framer-motion';

interface BundleBannerProps {
  bundle: Book;
  includedBooks: Book[];
}

export default function BundleBanner({ bundle, includedBooks }: BundleBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link
        href={`/books/${bundle.slug}`}
        className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.07]">
          <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
            <defs>
              <pattern id="bundle-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bundle-grid)" />
          </svg>
        </div>

        {/* Radial glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-gold/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl" />

        <div className="relative px-8 py-10 sm:px-12 sm:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left: Bundle info */}
            <div className="flex-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-brand-gold/20 text-brand-gold text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider border border-brand-gold/30">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0115 3v5a1 1 0 11-2 0V4.414l-.293.293a1 1 0 11-1.414-1.414l2-2A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
                Bundle & Save
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {bundle.title}
              </h3>

              <p className="mt-2 text-purple-200/80 max-w-lg">
                {bundle.description}
              </p>

              {/* Included books */}
              <div className="mt-5 flex flex-wrap gap-3">
                {includedBooks.map((book) => (
                  <span
                    key={book.slug}
                    className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 text-sm px-3 py-1.5 rounded-full backdrop-blur-sm"
                  >
                    <svg className="w-3.5 h-3.5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    {book.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Pricing & CTA */}
            <div className="flex-shrink-0 text-left md:text-right">
              <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2">
                <span className="text-3xl sm:text-4xl font-bold text-brand-gold">
                  ${bundle.price.toFixed(2)}
                </span>
                {bundle.regularValue && (
                  <span className="text-lg text-purple-200/60 line-through">
                    ${bundle.regularValue.toFixed(2)}
                  </span>
                )}
              </div>
              {bundle.savings && (
                <div className="mt-2 inline-block bg-green-500/20 text-green-400 text-sm font-bold px-3 py-1 rounded-full border border-green-500/30">
                  {bundle.savings}
                </div>
              )}
              <div className="mt-4">
                <span className="inline-flex items-center gap-2 bg-brand-gold hover:bg-amber-500 text-brand-black font-bold px-6 py-3 rounded-full transition-all duration-300 group-hover:scale-105 text-sm">
                  View Bundle
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
