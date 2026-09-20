import type { Metadata } from 'next';
import Link from 'next/link';
import { requireAdmin } from '@/app/lib/supabase/auth';
import BookForm from '../BookForm';

export const metadata: Metadata = {
  title: 'Add a book',
};

export default async function NewBookPage() {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <Link href="/admin/books" className="text-sm font-bold text-purple-700 hover:text-purple-900">
        ← Back to books
      </Link>
      <div className="mt-6 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-purple-700">Catalog</p>
        <h1 className="mt-3 font-playfair text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          Add a book
        </h1>
        <p className="mt-3 text-lg leading-8 text-gray-600">
          Save a draft now, then publish it when its details and files are complete.
        </p>
      </div>
      <div className="mt-9">
        <BookForm />
      </div>
    </div>
  );
}
