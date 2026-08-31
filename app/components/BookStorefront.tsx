'use client';

import { useMemo, useState } from 'react';
import BookCard from './BookCard';
import type { Book, BookSeries } from '../lib/books';

type Collection = 'all' | BookSeries;

interface BookStorefrontProps {
  books: Book[];
}

const collections: Array<{ id: Collection; label: string }> = [
  { id: 'all', label: 'All books' },
  { id: 'wyfl', label: 'Fruit Language' },
  { id: 'singles', label: 'Singles' },
  { id: 'marriage', label: 'Marriage' },
  { id: 'orchard', label: 'Through the Orchard' },
];

export default function BookStorefront({ books }: BookStorefrontProps) {
  const [activeCollection, setActiveCollection] = useState<Collection>('all');

  const visibleBooks = useMemo(
    () =>
      activeCollection === 'all'
        ? books
        : books.filter((book) => book.series === activeCollection),
    [activeCollection, books]
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Book collections"
        className="flex gap-2 overflow-x-auto border-b border-stone-200 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {collections.map((collection) => {
          const isActive = collection.id === activeCollection;

          return (
            <button
              key={collection.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCollection(collection.id)}
              className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-bold transition-colors ${
                isActive
                  ? 'bg-purple-800 text-white'
                  : 'bg-stone-100 text-gray-700 hover:bg-purple-50 hover:text-purple-800'
              }`}
            >
              {collection.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-baseline justify-between gap-4">
        <p className="text-sm font-semibold text-gray-600" aria-live="polite">
          {visibleBooks.length} {visibleBooks.length === 1 ? 'book' : 'books'}
        </p>
        <p className="hidden text-sm text-gray-500 sm:block">
          Select a book to view details and place an order.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {visibleBooks.map((book) => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>
    </div>
  );
}
