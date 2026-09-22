'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Container from '../components/ui/Container';

interface BooksErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BooksError({ error, reset }: BooksErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center bg-[#faf7f2] py-20">
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-stone-200 bg-white p-7 text-center shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
            Bookstore
          </p>
          <h1 className="mt-3 font-playfair text-4xl font-semibold text-gray-950">
            We couldn&apos;t load this book
          </h1>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-gray-600">
            The bookstore may be temporarily unavailable. Try again, or return to the physical book collection.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-gold px-7 py-3 font-bold text-brand-black shadow-md transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2"
            >
              Try again
            </button>
            <Link
              href="/books"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-stone-300 px-7 py-3 font-bold text-gray-700 transition-colors hover:border-purple-700 hover:text-purple-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2"
            >
              Browse physical books
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
