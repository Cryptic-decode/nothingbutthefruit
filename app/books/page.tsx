import type { Metadata } from 'next';
import BookstoreHero from '../components/BookstoreHero';
import BookFormatTabs from '../components/BookFormatTabs';
import BookStorefront from '../components/BookStorefront';
import BundleBanner from '../components/BundleBanner';
import EbookCard from '../components/EbookCard';
import ButtonLink from '../components/ui/ButtonLink';
import Container from '../components/ui/Container';
import {
  getAllBooks,
  getBookBySlug,
} from '../lib/books';
import type { Book } from '../lib/books';
import JsonLd from '../components/JsonLd';
import { getPublishedEbooks } from '../lib/ebooks';
import { entityIds, siteConfig } from '../lib/site';

export const metadata: Metadata = {
  title: 'Books',
  description:
    'Browse physical books and eBooks by Pastor Demetria Bass, including the What\u2019s Your Fruit Language? series, Singles Edition, Married Couples Edition, and Through the Orchard series.',
  keywords: [
    "What's your fruit language book",
    'Pastor Demetria Bass books',
    'fruit of the Spirit book',
    'christian books',
    'spiritual growth books',
    'devotional companion',
    'Singles Edition',
    'Christian singles devotional',
    'Through the Orchard book',
    'Married Couples Edition',
    'marriage fruit of the Spirit',
    'Christian marriage books',
  ],
  openGraph: {
    title: 'Books | Nothing But The Fruit Podcast',
    description:
      'Browse books by Pastor Demetria Bass including the What\u2019s Your Fruit Language? series, Singles Edition, Married Couples Edition, and Through the Orchard series.',
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

function getBooksBySlug(slugs: string[]): Book[] {
  return slugs
    .map((slug) => getBookBySlug(slug))
    .filter((book): book is Book => book !== undefined);
}

interface BooksPageProps {
  searchParams: Promise<{ format?: string }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const { format } = await searchParams;
  const activeFormat = format === 'ebooks' ? 'ebooks' : 'physical';
  const books = getAllBooks();
  const individualBooks = books.filter((book) => !book.isBundle);
  const bundles = books.filter((book) => book.isBundle);
  const heroBooks = getBooksBySlug([
    'whats-your-fruit-language',
    'whats-your-fruit-language-married-couples',
    'through-the-orchard-soil-to-harvest',
  ]);
  const ebookCatalog =
    activeFormat === 'ebooks'
      ? await getPublishedEbooks()
      : { books: [], error: false };
  const structuredItems =
    activeFormat === 'ebooks'
      ? ebookCatalog.books.map((book, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Book',
            name: book.title,
            bookFormat: 'https://schema.org/EBook',
            url: `${siteConfig.url}/books/${book.slug}`,
            image: book.coverUrl,
            author: { '@id': entityIds.author },
          },
        }))
      : books.map((book, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Book',
            name: book.title,
            url: `${siteConfig.url}/books/${book.slug}`,
            image: `${siteConfig.url}${book.coverImage}`,
            author: { '@id': entityIds.author },
          },
        }));

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${siteConfig.url}/books#collection`,
          url: `${siteConfig.url}/books`,
          name: 'Books by Pastor Demetria Bass',
          description: metadata.description,
          isPartOf: { '@id': entityIds.website },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: structuredItems.length,
            itemListElement: structuredItems,
          },
        }}
      />
      <BookstoreHero books={heroBooks} />

      <section id="book-collections" className="scroll-mt-28 py-20 lg:py-24">
        <Container>
          <BookFormatTabs activeFormat={activeFormat} />

          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
              {activeFormat === 'physical' ? 'Shop the collection' : 'Digital library'}
            </p>
            <h2 className="mt-3 font-playfair text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
              {activeFormat === 'physical'
                ? 'Find the right book for your season'
                : 'Faith-building resources, ready for digital reading'}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-gray-600">
              {activeFormat === 'physical'
                ? 'Explore personal growth, devotional, marriage, and discipleship resources by Pastor Demetria Bass.'
                : 'Browse digital editions published by Pastor Demetria Bass. Online purchasing and instant downloads are coming soon.'}
            </p>
          </div>

          {activeFormat === 'physical' ? (
            <BookStorefront books={individualBooks} />
          ) : ebookCatalog.error ? (
            <div role="alert" className="rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center">
              <h3 className="font-playfair text-3xl font-semibold text-gray-950">
                We couldn&apos;t load the eBooks
              </h3>
              <p className="mx-auto mt-3 max-w-lg leading-7 text-gray-600">
                Please try again shortly, or continue browsing the physical collection.
              </p>
              <ButtonLink href="/books" variant="outline-dark" className="mt-6">
                Browse physical books
              </ButtonLink>
            </div>
          ) : ebookCatalog.books.length > 0 ? (
            <div>
              <p className="text-sm font-semibold text-gray-600" aria-live="polite">
                {ebookCatalog.books.length} {ebookCatalog.books.length === 1 ? 'eBook' : 'eBooks'}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {ebookCatalog.books.map((book) => (
                  <EbookCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-[#faf7f2] px-6 py-14 text-center">
              <h3 className="font-playfair text-3xl font-semibold text-gray-950">eBooks are coming soon</h3>
              <p className="mx-auto mt-3 max-w-lg leading-7 text-gray-600">
                New digital editions will appear here as soon as Pastor Dee publishes them.
              </p>
              <ButtonLink href="/books" variant="dark" className="mt-6">
                Browse physical books
              </ButtonLink>
            </div>
          )}
        </Container>
      </section>

      {activeFormat === 'physical' && bundles.length > 0 && (
        <section className="pb-20 lg:pb-24">
          <Container className="space-y-8 lg:space-y-10">
            {bundles.map((bundle) => {
              const includedBooks = bundle.bundleIncludes
                ? getBooksBySlug(bundle.bundleIncludes)
                : [];

              if (includedBooks.length === 0) return null;

              return (
                <BundleBanner
                  key={bundle.slug}
                  bundle={bundle}
                  includedBooks={includedBooks}
                />
              );
            })}
          </Container>
        </section>
      )}

      {activeFormat === 'physical' && (
        <section className="border-y border-stone-200 bg-[#faf7f2] py-16 lg:py-20">
          <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
                Ordering for a group?
              </p>
              <h2 className="mt-3 font-playfair text-3xl font-semibold text-gray-950 sm:text-4xl">
                Build one order for your church, small group, or ministry.
              </h2>
              <p className="mt-3 leading-7 text-gray-600">
                Choose titles and quantities together, then Pastor Dee will follow up with payment and delivery details.
              </p>
            </div>
            <ButtonLink href="/books/bulk-order" variant="dark" size="lg" className="shrink-0">
              Start a bulk order
            </ButtonLink>
          </Container>
        </section>
      )}

      <section className="bg-purple-950 py-16 text-white">
        <Container className="flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-playfair text-3xl font-semibold">Have a question about an order?</h2>
            <p className="mt-2 text-purple-100/75">
              Reach out and we&apos;ll get back to you soon.
            </p>
          </div>
          <ButtonLink href="/contact" className="shrink-0">
            Contact us
          </ButtonLink>
        </Container>
      </section>
    </div>
  );
}
