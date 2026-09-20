import type { Metadata } from 'next';
import Link from 'next/link';
import AuthCard from '@/app/auth/AuthCard';
import AuthForm from '@/app/auth/AuthForm';
import { getAdminSession } from '@/app/lib/supabase/auth';
import { createClient } from '@/app/lib/supabase/server';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: (await getAdminSession()) ? 'Overview' : 'Dashboard sign in',
  };
}

interface AdminPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const admin = await getAdminSession();

  if (!admin) {
    const { error } = await searchParams;

    return (
      <AuthCard
        title="Welcome back"
        description="Sign in to manage the Nothing But The Fruit book catalog."
      >
        {error === 'callback' && (
          <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
            This password link is invalid or has expired. Please request a new one.
          </p>
        )}
        <AuthForm mode="login" />
      </AuthCard>
    );
  }

  const supabase = await createClient();
  const { data: books, error } = await supabase
    .from('books')
    .select('id, product_type, status');

  const totals = (books ?? []).reduce(
    (summary, book) => {
      summary.all += 1;
      summary[book.status] += 1;
      summary[book.product_type] += 1;
      return summary;
    },
    { all: 0, draft: 0, published: 0, archived: 0, ebook: 0, physical: 0 }
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-purple-700">Overview</p>
        <h1 className="mt-3 font-playfair text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          Welcome, Pastor Dee
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          This is your private workspace for managing the Nothing But The Fruit book catalog.
        </p>
      </div>

      {error ? (
        <div role="alert" className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900">
          <p className="font-bold">We couldn&apos;t load the catalog summary.</p>
          <p className="mt-1 text-sm leading-6">Refresh the page to try again.</p>
        </div>
      ) : (
        <section aria-labelledby="catalog-summary" className="mt-10">
          <h2 id="catalog-summary" className="sr-only">Catalog summary</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ['All books', totals.all],
              ['Published', totals.published],
              ['Drafts', totals.draft],
              ['eBooks', totals.ebook],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-600">{label}</p>
                <p className="mt-3 text-4xl font-bold tracking-tight text-gray-950">{value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Book catalog</p>
          <h2 className="mt-3 font-playfair text-3xl font-semibold text-gray-950">Book management</h2>
          <p className="mt-3 leading-7 text-gray-600">
            Create, edit, publish, and archive physical books and eBooks from one secure workspace.
          </p>
        </div>
        <Link
          href="/admin/books"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-gray-300 px-6 py-2.5 text-sm font-bold text-gray-800 transition-colors hover:border-purple-700 hover:text-purple-700"
        >
          Manage books
        </Link>
      </section>
    </div>
  );
}
