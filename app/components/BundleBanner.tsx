'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Book } from '../lib/books';
import { getBookDisplayImage, getBookDisplayVariant } from '../lib/books';
import BookMockup from './BookMockup';

interface BundleBannerProps {
  bundle: Book;
  includedBooks: Book[];
}

export default function BundleBanner({ bundle, includedBooks }: BundleBannerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-[2rem] bg-purple-950 text-white shadow-[0_24px_70px_rgba(59,7,100,0.18)]"
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-brand-gold/20 blur-3xl" />

      <div className="relative grid items-center gap-8 px-6 py-9 sm:px-10 lg:grid-cols-[0.8fr_1.2fr_auto] lg:gap-12 lg:px-14 lg:py-10">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-xs lg:max-w-sm">
          <BookMockup
            src={getBookDisplayImage(bundle)}
            alt={bundle.title}
            variant={getBookDisplayVariant(bundle)}
            sizes="(max-width: 1024px) 80vw, 30vw"
            className="h-full w-full"
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Bundle &amp; save
          </p>
          <h3 className="mt-3 max-w-xl font-playfair text-3xl font-semibold leading-tight sm:text-4xl">
            {bundle.title}
          </h3>
          <p className="mt-4 max-w-2xl leading-7 text-purple-100/80">
            {bundle.description}
          </p>
          <ul className="mt-5 space-y-2 text-sm text-purple-100/90">
            {includedBooks.map((book) => (
              <li key={book.slug} className="flex gap-3">
                <svg aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                </svg>
                <span>{book.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-white/15 pt-6 lg:min-w-44 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="text-3xl font-bold text-brand-gold">${bundle.price.toFixed(2)}</p>
          {bundle.regularValue && (
            <p className="mt-1 text-sm text-purple-200/60 line-through">
              ${bundle.regularValue.toFixed(2)} value
            </p>
          )}
          {bundle.savings && (
            <p className="mt-2 text-sm font-bold text-emerald-300">{bundle.savings}</p>
          )}
          <Link
            href={`/books/${bundle.slug}`}
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-gold px-6 text-sm font-bold text-brand-black transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-amber-500"
          >
            View bundle
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
