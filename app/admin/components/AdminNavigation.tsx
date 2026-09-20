'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { href: '/admin', label: 'Overview', exact: true },
  { href: '/admin/books', label: 'Books', exact: false },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard" className="space-y-1 border-t border-white/10 px-4 py-3 lg:mt-2 lg:py-5">
      {navigation.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`block rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
              isActive
                ? 'bg-white text-deep-purple shadow-sm'
                : 'text-purple-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
