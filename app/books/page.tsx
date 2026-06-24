import Link from 'next/link';
import type { Metadata } from 'next';
import BookCard from '../components/BookCard';
import BundleBanner from '../components/BundleBanner';
import { getBooksBySeries, getBookBySlug } from '../lib/books';

export const metadata: Metadata = {
  title: 'Books | Nothing But The Fruit Podcast',
  description:
    'Browse books by Pastor Demetria Bass including the What\u2019s Your Fruit Language? series, Married Couples Edition, and Through the Orchard series. Order your copies today.',
  keywords: [
    "What's your fruit language book",
    'Pastor Demetria Bass books',
    'fruit of the Spirit book',
    'christian books',
    'spiritual growth books',
    'devotional companion',
    'Through the Orchard book',
    'Married Couples Edition',
    'marriage fruit of the Spirit',
    'Christian marriage books',
  ],
  openGraph: {
    title: 'Books | Nothing But The Fruit Podcast',
    description:
      'Browse books by Pastor Demetria Bass including the What\u2019s Your Fruit Language? series, Married Couples Edition, and Through the Orchard series.',
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
  const marriageBooks = getBooksBySeries('marriage');
  const orchardBooks = getBooksBySeries('orchard');
  const bundle = wyflBooks.find((b) => b.slug === 'fruit-growth-bundle');
  const individualWyfl = wyflBooks.filter((b) => !b.isBundle);
  const bundleBooks = bundle?.bundleIncludes
    ? bundle.bundleIncludes
        .map((s) => getBookBySlug(s))
        .filter((b): b is NonNullable<typeof b> => b !== undefined)
    : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 lg:py-32"
        style={{
          background: 'linear-gradient(135deg, #581c87 0%, #312e81 50%, #111827 100%)',
          backgroundImage: 'linear-gradient(135deg, #581c87 0%, #312e81 50%, #111827 100%)',
          WebkitBackgroundClip: 'padding-box',
          backgroundClip: 'padding-box',
        }}
      >
        <div className="absolute inset-0">
          {/* Wave pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="waves-books" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q50,0 100,50 T200,50" stroke="#F59E0B" strokeWidth="2" fill="none" />
                <path d="M0,70 Q50,20 100,70 T200,70" stroke="#A855F7" strokeWidth="1.5" fill="none" />
                <path d="M0,30 Q50,-20 100,30 T200,30" stroke="#EC4899" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves-books)" />
          </svg>

          {/* Floating shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold opacity-10 rounded-lg blur-xl animate-float" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-400 opacity-5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400 opacity-10 rounded-xl rotate-45 blur-lg animate-float" style={{ animationDelay: '4s' }} />
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-brand-gold opacity-15 rounded-full blur-md animate-float" style={{ animationDelay: '1.5s' }} />

          {/* Floating book icons */}
          <div className="absolute top-32 right-1/4 opacity-20 animate-float">
            <svg className="w-16 h-16 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
          <div className="absolute bottom-40 left-1/3 opacity-15 animate-float" style={{ animationDelay: '1.5s' }}>
            <svg className="w-12 h-12 text-pink-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
          <div className="absolute top-1/2 right-1/5 opacity-10 animate-float" style={{ animationDelay: '3s' }}>
            <svg className="w-8 h-8 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>

          {/* Depth overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in">
              Our{' '}
              <span className="text-brand-black bg-brand-gold px-3 py-1 rounded-lg inline-block transform -rotate-1 shadow-2xl hover:scale-110 transition-all duration-300 cursor-default">
                Books
              </span>
            </h1>
            <p
              className="mt-8 text-xl leading-8 text-gray-200 max-w-3xl mx-auto sm:text-2xl sm:leading-9 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              Resources to help you grow deeper in your walk with God
            </p>
          </div>
        </div>
      </section>

      {/* What's Your Fruit Language? Series */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Series header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 text-purple-700 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              <span className="w-6 h-px bg-purple-300" />
              Series
              <span className="w-6 h-px bg-purple-300" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              What&apos;s Your Fruit Language?
            </h2>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              Discover how God speaks through the fruit of the Spirit
            </p>
          </div>

          {/* Bundle Banner */}
          {bundle && bundleBooks.length > 0 && (
            <div className="mb-20">
              <BundleBanner bundle={bundle} includedBooks={bundleBooks} />
            </div>
          )}

          {/* Individual Books */}
          {individualWyfl.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-[0.15em] whitespace-nowrap">
                  Also Available Individually
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
                {individualWyfl.map((book) => (
                  <BookCard key={book.slug} book={book} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Married Couples Edition Series */}
      <section className="py-24 lg:py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 text-purple-700 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              <span className="w-6 h-px bg-purple-300" />
              Series
              <span className="w-6 h-px bg-purple-300" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              What&apos;s Your Fruit Language? Married Couples Edition
            </h2>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              Discover, understand, and speak each other&apos;s fruit language
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {marriageBooks.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Through the Orchard Series */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 text-purple-700 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              <span className="w-6 h-px bg-purple-300" />
              Series
              <span className="w-6 h-px bg-purple-300" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Through the Orchard
            </h2>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              Cultivating the fruit of the Spirit in everyday life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
            {orchardBooks.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Questions About Your Order?
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            Pastor Dee handles all orders personally. Reach out and we&apos;ll get back to you soon.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-amber-500 text-brand-black font-bold py-3.5 px-8 rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Contact Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
