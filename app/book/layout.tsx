import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What's your fruit language? | Book Preorder - Nothing But The Fruit",
  description: 'Pre-order "What\'s your fruit language?" by Pastor Demetria Bass. Powerful biblical teachings on the fruit of the Spirit. Launching February 10, 2026. $19.95 + free delivery during pre-order period.',
  keywords: [
    "What's your fruit language",
    'Pastor Demetria Bass book',
    'fruit of the Spirit book',
    'biblical teaching book',
    'spiritual growth book',
    'christian book preorder',
    'gospel book',
    'biblical wisdom book',
    'faith transformation book',
    'Nothing But The Fruit book'
  ],
  openGraph: {
    title: "What's your fruit language? | Book Preorder - Nothing But The Fruit",
    description: 'Pre-order "What\'s your fruit language?" by Pastor Demetria Bass. Powerful biblical teachings on the fruit of the Spirit. Launching February 10, 2026.',
    url: 'https://nothingbutthefruit.com/book',
    type: 'website',
    images: [
      {
        url: '/og-book.jpg',
        width: 1200,
        height: 630,
        alt: "What's your fruit language? by Pastor Demetria Bass",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "What's your fruit language? | Book Preorder - Nothing But The Fruit",
    description: 'Pre-order "What\'s your fruit language?" by Pastor Demetria Bass. Launching February 10, 2026.',
    images: ['/og-book.jpg'],
  },
  alternates: {
    canonical: 'https://nothingbutthefruit.com/book',
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
