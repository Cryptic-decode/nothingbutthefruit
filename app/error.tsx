'use client';

import { useEffect } from 'react';
import ButtonLink from './components/ui/ButtonLink';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
          Something went wrong
        </p>
        <h1 className="mt-4 font-playfair text-4xl font-semibold text-gray-950 sm:text-5xl">
          We couldn&apos;t load this page.
        </h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">
          This may be a temporary connection problem. Try again, or return home and continue browsing.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-gold px-8 py-3 font-bold text-brand-black shadow-lg transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-xl active:translate-y-0"
          >
            Try again
          </button>
          <ButtonLink href="/" variant="outline-dark">
            Go home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
