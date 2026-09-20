import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/app/lib/supabase/auth';
import { createClient } from '@/app/lib/supabase/server';
import ConfirmActionButton from '../../components/ConfirmActionButton';
import BookForm from '../BookForm';
import { archiveBook, restoreBook } from '../actions';

export const metadata: Metadata = {
  title: 'Edit book',
};

interface EditBookPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    error?: string;
    restored?: string;
    saved?: string;
  }>;
}

export default async function EditBookPage({ params, searchParams }: EditBookPageProps) {
  await requireAdmin();
  const { id } = await params;
  const query = await searchParams;
  const supabase = await createClient();
  const { data: book, error } = await supabase.from('books').select('*').eq('id', id).single();

  if (error || !book) notFound();

  const archiveAction = archiveBook.bind(null, book.id);
  const restoreAction = restoreBook.bind(null, book.id);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/admin/books" className="text-sm font-bold text-purple-700 hover:text-purple-900">
            ← Back to books
          </Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-purple-700">Catalog</p>
          <h1 className="mt-3 font-playfair text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            Edit book
          </h1>
        </div>
        <div className="sm:pt-8">
          {book.status === 'archived' ? (
            <form action={restoreAction}>
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-purple-700 px-5 py-2.5 text-sm font-bold text-purple-700 hover:bg-purple-50"
              >
                Restore as draft
              </button>
            </form>
          ) : (
            <ConfirmActionButton
              action={archiveAction}
              title="Archive this book?"
              description="It will be removed from the published catalog, but its details and files will be kept so you can restore it later."
              triggerLabel="Archive book"
              confirmLabel="Yes, archive it"
              pendingLabel="Archiving…"
              tone="danger"
              triggerClassName="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-red-200 px-5 py-2.5 text-sm font-bold text-red-700 hover:border-red-700 hover:bg-red-50"
            />
          )}
        </div>
      </div>

      {query.saved === '1' && (
        <p role="status" className="mt-7 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          The book was saved successfully.
        </p>
      )}
      {query.restored === '1' && (
        <p role="status" className="mt-7 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          The book was restored as a draft.
        </p>
      )}
      {query.error && (
        <p role="alert" className="mt-7 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          We could not complete that action. Please try again.
        </p>
      )}

      <div className="mt-9">
        <BookForm book={book} />
      </div>
    </div>
  );
}
