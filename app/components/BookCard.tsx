'use client';

import Link from 'next/link';
import type { Book } from '../lib/books';
import { getBookDisplayImage, getBookDisplayVariant } from '../lib/books';
import BookMockup from './BookMockup';
import { motion } from 'framer-motion';

interface BookCardProps {
  book: Book;
  featured?: boolean;
  badge?: string;
}

export default function BookCard({ book, featured, badge }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link
        href={`/books/${book.slug}`}
        className={`group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 ${
          featured ? 'md:col-span-2 md:flex' : ''
        }`}
      >
        <div
          className={`relative ${
            featured
              ? 'w-full md:w-5/12 aspect-[4/3] p-6 flex items-center justify-center bg-gray-50/50'
              : 'w-full aspect-[3/4]'
          }`}
        >
          <div className={featured ? 'w-full h-full' : 'absolute inset-4'}>
            <BookMockup
              src={getBookDisplayImage(book)}
              alt={book.title}
              variant={getBookDisplayVariant(book)}
              sizes={
                featured
                  ? '(max-width: 768px) 100vw, 50vw'
                  : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              }
              className="w-full h-full"
            />
          </div>
          {badge && (
            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg z-10">
              {badge}
            </div>
          )}
        </div>
        <div className={`p-7 flex flex-col justify-center ${featured ? 'md:w-7/12' : ''}`}>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-200 line-clamp-2 leading-snug">
            {book.title}
          </h3>
          <p className="mt-2 text-lg font-bold text-brand-gold">
            ${book.price.toFixed(2)}
          </p>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
            {book.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 group-hover:text-purple-900 transition-colors duration-200">
            View Details
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
