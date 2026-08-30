import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Bulk Book Order',
  description:
    'Request multiple Nothing But The Fruit books for your church, small group, or ministry.',
  openGraph: {
    title: 'Bulk Book Order | Nothing But The Fruit Books',
    description:
      'Request multiple Nothing But The Fruit books for your church, small group, or ministry.',
    url: 'https://nothingbutthefruit.com/books/bulk-order',
  },
  alternates: {
    canonical: 'https://nothingbutthefruit.com/books/bulk-order',
  },
};

export default function BulkOrderLayout({ children }: { children: ReactNode }) {
  return children;
}
