import type { Metadata } from 'next';
import Link from 'next/link';
import { requireAdmin } from '@/app/lib/supabase/auth';
import { createClient } from '@/app/lib/supabase/server';
import BookCatalogToolbar from './BookCatalogToolbar';

export const metadata: Metadata = {
  title: 'Books',
};

interface BooksPageProps {
  searchParams: Promise<{
    archived?: string;
    error?: string;
    format?: string;
    q?: string;
    status?: string;
  }>;
}

const validFormats = new Set(['all', 'ebook', 'physical']);
const validStatuses = new Set(['all', 'draft', 'published', 'archived']);

const statusStyles = {
  draft: 'bg-amber-100 text-amber-900',
  published: 'bg-emerald-100 text-emerald-900',
  archived: 'bg-stone-200 text-stone-700',
} as const;

function formatPrice(priceCents: number | null): string {
  if (priceCents === null) return 'Not set';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceCents / 100);
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  await requireAdmin();
  const {
    archived,
    error: queryError,
    format: requestedFormat,
    q: requestedQuery,
    status: requestedStatus,
  } = await searchParams;
  const format = validFormats.has(requestedFormat ?? '') ? requestedFormat! : 'all';
  const status = validStatuses.has(requestedStatus ?? '') ? requestedStatus! : 'all';
  const searchQuery = (requestedQuery ?? '').trim().slice(0, 100);
  const supabase = await createClient();
  const { data: books, error } = await supabase
    .from('books')
    .select('id, title, slug, product_type, status, price_cents, updated_at')
    .order('updated_at', { ascending: false });
  const normalizedQuery = searchQuery.toLocaleLowerCase();
  const visibleBooks = (books ?? []).filter((book) => {
    const matchesFormat = format === 'all' || book.product_type === format;
    const matchesStatus = status === 'all' || book.status === status;
    const matchesSearch =
      !normalizedQuery ||
      book.title.toLocaleLowerCase().includes(normalizedQuery) ||
      book.slug.includes(normalizedQuery);

    return matchesFormat && matchesStatus && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-purple-700">Catalog</p>
          <h1 className="mt-3 font-playfair text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            Books
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600">
            Create and manage the books that will power the digital bookstore.
          </p>
        </div>
        <Link
          href="/admin/books/new"
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-brand-gold px-6 py-3 font-bold text-brand-black shadow-md transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-lg"
        >
          Add a book
        </Link>
      </div>

      {archived === '1' && (
        <p role="status" className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          The book was archived. You can restore it at any time.
        </p>
      )}
      {queryError && (
        <p role="alert" className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          We could not complete that action. Please try again.
        </p>
      )}

      {!error && (books?.length ?? 0) > 0 && (
        <BookCatalogToolbar
          initialQuery={searchQuery}
          initialFormat={format}
          initialStatus={status}
          resultCount={visibleBooks.length}
          totalCount={books?.length ?? 0}
        />
      )}

      {error ? (
        <div role="alert" className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900">
          <p className="font-bold">We couldn&apos;t load the books.</p>
          <p className="mt-1 text-sm">Refresh the page to try again.</p>
        </div>
      ) : visibleBooks.length ? (
        <div className="mt-8 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[minmax(0,2fr)_0.8fr_0.8fr_0.8fr_auto] gap-4 border-b border-stone-200 bg-stone-50 px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 md:grid">
            <span>Book</span>
            <span>Format</span>
            <span>Status</span>
            <span>Price</span>
            <span className="sr-only">Actions</span>
          </div>
          <ul className="divide-y divide-stone-200">
            {visibleBooks.map((book) => (
              <li key={book.id} className="grid gap-4 px-5 py-5 md:grid-cols-[minmax(0,2fr)_0.8fr_0.8fr_0.8fr_auto] md:items-center md:px-6">
                <div className="min-w-0">
                  <p className="truncate font-bold text-gray-950">{book.title}</p>
                  <p className="mt-1 truncate text-sm text-gray-500">/books/{book.slug}</p>
                  <p className="mt-1 text-xs text-gray-400 md:hidden">Updated {formatDate(book.updated_at)}</p>
                </div>
                <div className="text-sm font-semibold capitalize text-gray-700">
                  {book.product_type === 'ebook' ? 'eBook' : 'Physical'}
                </div>
                <div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[book.status]}`}>
                    {book.status}
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-700">{formatPrice(book.price_cents)}</div>
                <Link
                  href={`/admin/books/${book.id}`}
                  className="inline-flex min-h-10 items-center justify-center rounded-full border-2 border-stone-300 px-4 py-2 text-sm font-bold text-gray-800 transition-colors hover:border-purple-700 hover:text-purple-700"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : books?.length ? (
        <div className="mt-8 rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
          <h2 className="font-playfair text-3xl font-semibold text-gray-950">No matching books</h2>
          <p className="mx-auto mt-3 max-w-md leading-7 text-gray-600">
            Try another search or clear the filters to see the full catalog.
          </p>
          <Link
            href="/admin/books"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-purple-700 px-5 py-2.5 text-sm font-bold text-purple-700 hover:bg-purple-50"
          >
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
          <h2 className="font-playfair text-3xl font-semibold text-gray-950">No books yet</h2>
          <p className="mx-auto mt-3 max-w-md leading-7 text-gray-600">
            Start with a draft. You can add the cover, eBook file, and publish it when everything is ready.
          </p>
          <Link
            href="/admin/books/new"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-gold px-6 py-3 font-bold text-brand-black shadow-md hover:bg-amber-500"
          >
            Create the first book
          </Link>
        </div>
      )}
    </div>
  );
}
