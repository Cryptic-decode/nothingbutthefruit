import Link from 'next/link';
import type { Book } from '../lib/books';
import BookMockup from './BookMockup';

interface BookCardProps {
  book: Book;
  featured?: boolean;
  badge?: string;
}

export default function BookCard({ book, featured, badge }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className={`group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
        featured ? 'md:col-span-2 md:flex' : ''
      }`}
    >
      <div
        className={`relative ${
          featured
            ? 'w-full md:w-1/2 aspect-video p-4 flex items-center justify-center bg-gray-50'
            : 'w-full aspect-[3/4]'
        }`}
      >
        <div className={featured ? 'w-full h-full' : 'absolute inset-2'}>
          <BookMockup
            src={book.coverImage}
            alt={book.title}
            aspect={featured ? 'landscape' : book.coverAspect}
            sizes={
              featured
                ? '(max-width: 768px) 100vw, 50vw'
                : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            }
            className="w-full h-full"
          />
        </div>
        {badge && (
          <div className="absolute top-3 left-3 bg-brand-gold text-brand-black text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg z-10">
            {badge}
          </div>
        )}
      </div>
      <div className={`p-6 flex flex-col justify-center ${featured ? 'md:w-1/2' : ''}`}>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-200">
          {book.title}
        </h3>
        <p className="mt-1 text-xl font-bold text-brand-gold">
          ${book.price.toFixed(2)}
        </p>
        {book.savings && (
          <p className="text-sm text-green-600 font-semibold">{book.savings}</p>
        )}
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {book.description}
        </p>
        <div className="mt-4 inline-flex items-center text-sm font-semibold text-purple-700 group-hover:text-purple-900 transition-colors duration-200">
          View Details
          <svg
            className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
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
        </div>
      </div>
    </Link>
  );
}
