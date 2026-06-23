import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bulk Book Order | Nothing But The Fruit Books',
  description:
    'Order multiple books at once for your church, small group, or ministry. Pastor Demetria Bass handles all orders personally.',
  openGraph: {
    title: 'Bulk Book Order | Nothing But The Fruit Books',
    description:
      'Order multiple books at once for your church, small group, or ministry.',
    url: 'https://nothingbutthefruit.com/books/bulk-order',
  },
  alternates: {
    canonical: 'https://nothingbutthefruit.com/books/bulk-order',
  },
};

export default function BulkOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
