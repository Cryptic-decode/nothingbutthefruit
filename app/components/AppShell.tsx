'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import ScrollAnimations from './ScrollAnimations';

interface AppShellProps {
  children: ReactNode;
  footer: ReactNode;
  header: ReactNode;
}

export default function AppShell({ children, footer, header }: AppShellProps) {
  const pathname = usePathname();
  const isBackOffice =
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/auth' ||
    pathname.startsWith('/auth/');

  if (isBackOffice) {
    return (
      <main id="main-content" tabIndex={-1} className="min-h-dvh focus:outline-none">
        {children}
      </main>
    );
  }

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-brand-gold px-5 py-3 font-bold text-brand-black shadow-lg transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      {header}
      <main
        id="main-content"
        tabIndex={-1}
        className="pt-[90px] focus:outline-none"
      >
        {children}
      </main>
      {footer}
      <ScrollAnimations />
    </>
  );
}
