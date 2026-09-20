'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import SelectField, { type SelectValue } from '@/app/components/ui/SelectField';

interface BookCatalogToolbarProps {
  initialQuery: string;
  initialFormat: string;
  initialStatus: string;
  resultCount: number;
  totalCount: number;
}

const formatOptions = [
  { value: 'all', label: 'All formats' },
  { value: 'ebook', label: 'eBooks' },
  { value: 'physical', label: 'Physical books' },
] as const;

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
  { value: 'archived', label: 'Archived' },
] as const;

export default function BookCatalogToolbar({
  initialQuery,
  initialFormat,
  initialStatus,
  resultCount,
  totalCount,
}: BookCatalogToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  const hasFilters = Boolean(
    initialQuery || initialFormat !== 'all' || initialStatus !== 'all'
  );

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === 'all') params.delete(key);
      else params.set(key, value);
    });

    const nextQuery = params.toString();
    router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateParams({ q: query.trim() });
  }

  function handleFormatChange(value: SelectValue | null) {
    updateParams({ format: typeof value === 'string' ? value : 'all' });
  }

  function handleStatusChange(value: SelectValue | null) {
    updateParams({ status: typeof value === 'string' ? value : 'all' });
  }

  return (
    <section aria-label="Filter books" className="mt-8 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(16rem,1fr)_13rem_13rem_auto] lg:items-end">
        <form onSubmit={handleSearch} className="flex min-w-0 gap-2">
          <div className="min-w-0 flex-1">
            <label htmlFor="book-search" className="mb-2 block text-sm font-bold text-gray-900">
              Search books
            </label>
            <input
              id="book-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title"
              className="min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3.5 text-sm text-gray-950 shadow-sm placeholder:text-gray-400 hover:border-stone-400 focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
          </div>
          <button
            type="submit"
            className="mt-7 inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-purple-700 px-4 text-sm font-bold text-white transition-colors hover:bg-purple-800"
          >
            Search
          </button>
        </form>

        <div>
          <label htmlFor="book-format-filter" className="mb-2 block text-sm font-bold text-gray-900">
            Format
          </label>
          <SelectField
            inputId="book-format-filter"
            value={initialFormat}
            options={formatOptions}
            onChange={handleFormatChange}
            compact
          />
        </div>

        <div>
          <label htmlFor="book-status-filter" className="mb-2 block text-sm font-bold text-gray-900">
            Status
          </label>
          <SelectField
            inputId="book-status-filter"
            value={initialStatus}
            options={statusOptions}
            onChange={handleStatusChange}
            compact
          />
        </div>

        {hasFilters && (
          <Link
            href={pathname}
            className="inline-flex min-h-11 items-center justify-center rounded-lg px-3 text-sm font-bold text-purple-700 hover:bg-purple-50 hover:text-purple-900"
          >
            Clear filters
          </Link>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-600" role="status">
        Showing {resultCount} of {totalCount} {totalCount === 1 ? 'book' : 'books'}.
      </p>
    </section>
  );
}
