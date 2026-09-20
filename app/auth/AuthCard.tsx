import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import BrandLogoOnDark from '@/app/components/ui/BrandLogoOnDark';

interface AuthCardProps {
  children: ReactNode;
  description: string;
  title: string;
}

export default function AuthCard({ children, description, title }: AuthCardProps) {
  return (
    <div className="grid min-h-dvh bg-stone-50 lg:grid-cols-[minmax(20rem,0.8fr)_minmax(32rem,1.2fr)]">
      <section className="relative hidden overflow-hidden bg-deep-purple px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[64px] border-white/5"
        />
        <Link href="/" className="relative w-fit rounded-lg focus-visible:outline-white">
          <span className="sr-only">Return to Nothing But The Fruit</span>
          <BrandLogoOnDark priority />
        </Link>
        <div className="relative max-w-md">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-amber-300">
            Nothing But The Fruit
          </p>
          <p className="font-playfair text-4xl font-semibold leading-tight">
            Manage the bookstore with clarity and confidence.
          </p>
          <p className="mt-5 max-w-sm text-base leading-7 text-purple-100">
            A private workspace for Pastor Dee to prepare and manage book listings.
          </p>
        </div>
        <p className="relative text-sm text-purple-200">Pure Gospel. Real Growth.</p>
      </section>

      <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 inline-flex lg:hidden">
            <span className="sr-only">Return to Nothing But The Fruit</span>
            <Image
              src="/NBTF44.png"
              alt=""
              width={88}
              height={86}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_24px_70px_rgba(28,25,23,0.08)] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-purple-700">
              Pastor Dee&apos;s dashboard
            </p>
            <h1 className="mt-3 font-playfair text-4xl font-semibold tracking-tight text-gray-950">
              {title}
            </h1>
            <p className="mt-3 leading-7 text-gray-600">{description}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
