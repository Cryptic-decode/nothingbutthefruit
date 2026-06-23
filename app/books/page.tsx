import Link from 'next/link';
import type { Metadata } from 'next';
import BookCard from '../components/BookCard';
import { getBooksBySeries } from '../lib/books';

export const metadata: Metadata = {
  title: 'Books | Nothing But The Fruit Podcast',
  description:
    'Browse books by Pastor Demetria Bass including the What\u2019s Your Fruit Language? series and Through the Orchard series. Order your copies today.',
  keywords: [
    "What's your fruit language book",
    'Pastor Demetria Bass books',
    'fruit of the Spirit book',
    'christian books',
    'spiritual growth books',
    'devotional companion',
    'Through the Orchard book',
  ],
  openGraph: {
    title: 'Books | Nothing But The Fruit Podcast',
    description:
      'Browse books by Pastor Demetria Bass including the What\u2019s Your Fruit Language? series and Through the Orchard series.',
    url: 'https://nothingbutthefruit.com/books',
    images: [
      {
        url: '/og-books.jpg',
        width: 1200,
        height: 630,
        alt: 'Nothing But The Fruit Books',
      },
    ],
  },
  alternates: {
    canonical: 'https://nothingbutthefruit.com/books',
  },
};

export default function BooksPage() {
  const wyflBooks = getBooksBySeries('wyfl');
  const orchardBooks = getBooksBySeries('orchard');
  const bundle = wyflBooks.find((b) => b.slug === 'fruit-growth-bundle');
  const individualWyfl = wyflBooks.filter((b) => !b.isBundle);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 lg:py-32"
        style={{
          background:
            'linear-gradient(135deg, #581c87 0%, #312e81 50%, #111827 100%)',
        }}
      >
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="waves-books"
                x="0"
                y="0"
                width="200"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,50 Q50,0 100,50 T200,50"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M0,70 Q50,20 100,70 T200,70"
                  stroke="#A855F7"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M0,30 Q50,-20 100,30 T200,30"
                  stroke="#EC4899"
                  strokeWidth="1"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves-books)" />
          </svg>
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold opacity-10 rounded-lg blur-xl animate-float" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-400 opacity-5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in">
            Our{' '}
            <span className="text-brand-black bg-brand-gold px-3 py-1 rounded-lg inline-block transform -rotate-1 shadow-2xl hover:scale-110 transition-all duration-300 cursor-default">
              Books
            </span>
          </h1>
          <p className="mt-8 text-xl leading-8 text-gray-200 max-w-3xl mx-auto sm:text-2xl sm:leading-9 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Resources to help you grow deeper in your walk with God
          </p>
        </div>
      </section>

      {/* Series 1: What's Your Fruit Language? */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              What&apos;s Your Fruit Language? Series
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Discover how God speaks through the fruit of the Spirit
            </p>
          </div>

          {/* Featured Bundle Card */}
          {bundle && (
            <div className="mb-8">
              <BookCard book={bundle} featured badge={bundle.savings} />
            </div>
          )}

          {/* Individual Books */}
          {individualWyfl.length > 0 && (
            <>
              <p className="text-center text-gray-500 text-sm font-semibold mb-6 uppercase tracking-wider">
                Also available individually
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {individualWyfl.map((book) => (
                  <BookCard key={book.slug} book={book} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Series 2: Through the Orchard */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Through the Orchard Series
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Cultivating the fruit of the Spirit in everyday life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {orchardBooks.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Questions About Your Order?
          </h2>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Pastor Dee handles all orders personally. Reach out and we will get
            back to you soon.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block bg-brand-gold hover:bg-amber-500 text-brand-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
