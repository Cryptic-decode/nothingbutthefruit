'use client';

import Link from 'next/link';
import BookMockup from './BookMockup';
import type { Book } from '../lib/books';
import { getBookDisplayImage, getBookDisplayVariant } from '../lib/books';
import { motion } from 'framer-motion';

interface RelatedBooksProps {
  books: Book[];
  bundleIncludes?: boolean;
}

export default function RelatedBooks({ books, bundleIncludes }: RelatedBooksProps) {
  if (books.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            {bundleIncludes ? "What's Included" : 'Also in This Series'}
          </h2>
          {bundleIncludes && (
            <p className="mt-1 text-gray-500 text-sm">
              Two powerful resources in one package
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {books.map((book, i) => (
            <motion.div
              key={book.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <Link
                href={`/books/${book.slug}`}
                className="group flex items-center gap-5 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 border border-gray-100"
              >
                <div className="relative w-16 h-24 flex-shrink-0">
                  <BookMockup
                    src={getBookDisplayImage(book)}
                    alt={book.title}
                    variant={getBookDisplayVariant(book)}
                    sizes="64px"
                    className="w-full h-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-200 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-brand-gold font-bold mt-0.5 text-sm">
                    ${book.price.toFixed(2)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-purple-700 font-medium mt-1 group-hover:gap-1.5 transition-all duration-200">
                    View Details
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
