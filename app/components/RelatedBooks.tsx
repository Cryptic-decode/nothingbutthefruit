import Link from 'next/link';
import BookMockup from './BookMockup';
import type { Book } from '../lib/books';

interface RelatedBooksProps {
  books: Book[];
  bundleIncludes?: boolean;
}

export default function RelatedBooks({ books, bundleIncludes }: RelatedBooksProps) {
  if (books.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {bundleIncludes ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              What&apos;s Included in This Bundle
            </h2>
            <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
              Two powerful resources in one package
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {books.map((book) => (
                <Link
                  key={book.slug}
                  href={`/books/${book.slug}`}
                  className="group flex items-center gap-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
                >
                  <div className="relative w-20 h-28 flex-shrink-0">
                    <BookMockup
                      src={book.coverImage}
                      alt={book.title}
                      sizes="80px"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-200">
                      {book.title}
                    </h3>
                    <p className="text-brand-gold font-bold mt-1">
                      ${book.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">View details</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
              Also in this series
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {books.map((book) => (
                <Link
                  key={book.slug}
                  href={`/books/${book.slug}`}
                  className="group flex items-center gap-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
                >
                  <div className="relative w-20 h-28 flex-shrink-0">
                    <BookMockup
                      src={book.coverImage}
                      alt={book.title}
                      sizes="80px"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-200">
                      {book.title}
                    </h3>
                    <p className="text-brand-gold font-bold mt-1">
                      ${book.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">View details</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
