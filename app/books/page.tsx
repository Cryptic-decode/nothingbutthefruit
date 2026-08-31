import type { Metadata } from 'next';
import BookstoreHero from '../components/BookstoreHero';
import BookStorefront from '../components/BookStorefront';
import BundleBanner from '../components/BundleBanner';
import ButtonLink from '../components/ui/ButtonLink';
import Container from '../components/ui/Container';
import {
  getAllBooks,
  getBookBySlug,
} from '../lib/books';
import type { Book } from '../lib/books';
import JsonLd from '../components/JsonLd';
import { entityIds, siteConfig } from '../lib/site';

export const metadata: Metadata = {
  title: 'Books',
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

function getBooksBySlug(slugs: string[]): Book[] {
  return slugs
    .map((slug) => getBookBySlug(slug))
    .filter((book): book is Book => book !== undefined);
}

export default function BooksPage() {
  const books = getAllBooks();
  const individualBooks = books.filter((book) => !book.isBundle);
  const bundle = books.find((book) => book.isBundle);
  const bundleBooks = bundle?.bundleIncludes
    ? getBooksBySlug(bundle.bundleIncludes)
    : [];
  const heroBooks = getBooksBySlug([
    'whats-your-fruit-language',
    'whats-your-fruit-language-married-couples',
    'through-the-orchard-soil-to-harvest',
  ]);

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
            numberOfItems: books.length,
            itemListElement: books.map((book, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Book',
                name: book.title,
                url: `${siteConfig.url}/books/${book.slug}`,
                image: `${siteConfig.url}${book.coverImage}`,
                author: { '@id': entityIds.author },
              },
            })),
          },
        }}
      />
      <BookstoreHero books={heroBooks} />

      <section id="book-collections" className="scroll-mt-28 py-20 lg:py-24">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
              Shop the collection
            </p>
            <h2 className="mt-3 font-playfair text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
              Find the right book for your season
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-gray-600">
              Explore personal growth, devotional, marriage, and discipleship resources by Pastor Demetria Bass.
            </p>
          </div>

          <BookStorefront books={individualBooks} />
        </Container>
      </section>

      {bundle && bundleBooks.length > 0 && (
        <section className="pb-20 lg:pb-24">
          <Container>
            <BundleBanner bundle={bundle} includedBooks={bundleBooks} />
          </Container>
        </section>
      )}

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
