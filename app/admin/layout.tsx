import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { signOut } from '@/app/auth/actions';
import { getAdminSession } from '@/app/lib/supabase/auth';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Nothing But The Fruit Dashboard',
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await getAdminSession();

  if (!admin) {
    return children;
  }

  return (
    <div className="min-h-dvh bg-stone-50 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="border-b border-purple-900 bg-deep-purple text-white lg:sticky lg:top-0 lg:h-dvh lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-6 px-5 py-4 lg:block lg:px-6 lg:py-7">
          <Link href="/admin" className="inline-flex rounded-lg focus-visible:outline-white">
            <span className="sr-only">Nothing But The Fruit dashboard</span>
            <Image
              src="/NBTF44.png"
              alt=""
              width={86}
              height={84}
              className="h-16 w-auto object-contain lg:h-20"
              priority
            />
          </Link>
          <p className="text-right text-xs font-bold uppercase tracking-[0.2em] text-purple-200 lg:mt-5 lg:text-left">
            Bookstore dashboard
          </p>
        </div>

        <nav aria-label="Dashboard" className="border-t border-white/10 px-4 py-3 lg:mt-2 lg:py-5">
          <Link
            href="/admin"
            aria-current="page"
            className="block rounded-xl bg-white px-4 py-3 text-sm font-bold text-deep-purple shadow-sm"
          >
            Overview
          </Link>
        </nav>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4 lg:absolute lg:bottom-0 lg:left-0 lg:w-[17rem] lg:block lg:px-6 lg:py-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-200">Signed in as</p>
            <p className="mt-1 truncate text-sm font-medium text-white">{admin.email ?? 'Administrator'}</p>
          </div>
          <form action={signOut} className="lg:mt-4">
            <button
              type="submit"
              className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-deep-purple"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="border-b border-stone-200 bg-white px-5 py-4 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <p className="text-sm font-semibold text-gray-600">Nothing But The Fruit</p>
            <Link href="/books" className="text-sm font-bold text-purple-700 hover:text-purple-900">
              View bookstore
            </Link>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
