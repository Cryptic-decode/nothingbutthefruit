import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getAllBooks,
  getBookBySlug,
  getBookDisplayImage,
  getBookDisplayVariant,
  getBookSeriesLabel,
  getRelatedBooks,
} from '../../lib/books';
import type { Book } from '../../lib/books';
import BookMockup from '../../components/BookMockup';
import BookOrderForm from '../../components/BookOrderForm';
import RelatedBooks from '../../components/RelatedBooks';
import Container from '../../components/ui/Container';

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBooks().map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};

  return {
    title: `${book.title} | Nothing But The Fruit Books`,
    description: book.description,
    openGraph: {
      title: `${book.title} | Nothing But The Fruit Books`,
      description: book.description,
      url: `https://nothingbutthefruit.com/books/${book.slug}`,
      images: [
        {
          url: book.coverImage,
          width: 1200,
          height: 630,
          alt: book.title,
        },
      ],
    },
    alternates: {
      canonical: `https://nothingbutthefruit.com/books/${book.slug}`,
    },
  };
}

export default async function BookDetailPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const related = getRelatedBooks(slug);
  const bundleBooks: Book[] = book.bundleIncludes
    ? book.bundleIncludes
        .map((includedSlug) => getBookBySlug(includedSlug))
        .filter((includedBook): includedBook is Book => includedBook !== undefined)
    : [];

  const baseUrl = 'https://nothingbutthefruit.com';

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Book',
            name: book.title,
            description: book.description,
            author: {
              '@type': 'Person',
              name: 'Pastor Demetria Bass',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Bass Global Ministries',
            },
            image: `${baseUrl}${book.coverImage}`,
            url: `${baseUrl}/books/${book.slug}`,
            offers: {
              '@type': 'Offer',
              price: book.price,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            ...(book.isBundle
              ? {
                  hasPart: (book.bundleIncludes ?? []).map((includedSlug) => {
                    const included = getBookBySlug(includedSlug);
                    return included
                      ? {
                          '@type': 'Book',
                          name: included.title,
                          url: `${baseUrl}/books/${included.slug}`,
                        }
                      : {};
                  }),
                }
              : {}),
          }),
        }}
      />

      <section className="border-b border-stone-200 bg-[#faf7f2] py-6">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/books" className="font-semibold text-purple-700 hover:text-purple-900">
              Books
            </Link>
            <span aria-hidden="true">/</span>
            <span className="truncate" aria-current="page">{book.title}</span>
          </nav>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#faf7f2] pb-20 pt-10 lg:pb-24 lg:pt-14">
        <div className="absolute -left-36 top-28 h-80 w-80 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-800/10 blur-3xl" />

        <Container className="relative">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5 xl:col-span-4">
              <div
                className={`relative mx-auto w-full rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_24px_70px_rgba(54,35,18,0.10)] sm:p-10 ${
                  book.coverAspect === 'landscape'
                    ? 'aspect-[4/3] max-w-xl'
                    : 'aspect-[3/4] max-w-md'
                }`}
              >
                <BookMockup
                  src={getBookDisplayImage(book)}
                  alt={book.title}
                  variant={getBookDisplayVariant(book)}
                  priority
                  sizes="(max-width: 1024px) 80vw, 32vw"
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className="lg:col-span-7 xl:col-span-4 xl:pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-700">
                {book.isBundle ? 'Featured bundle' : getBookSeriesLabel(book.series)}
              </p>
              <h1 className="mt-4 font-playfair text-4xl font-semibold leading-[1.08] tracking-tight text-gray-950 sm:text-5xl">
                {book.title}
              </h1>
              <p className="mt-4 text-sm font-semibold text-gray-500">
                By Pastor Demetria Bass
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="text-3xl font-bold text-gray-950">${book.price.toFixed(2)}</span>
                {book.regularValue && (
                  <span className="text-base text-gray-400 line-through">
                    ${book.regularValue.toFixed(2)} value
                  </span>
                )}
                {book.savings && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">
                    {book.savings}
                  </span>
                )}
              </div>

              <p className="mt-6 text-base leading-8 text-gray-700">
                {book.description}
              </p>

              <div className="mt-8 border-t border-stone-200 pt-6">
                <p className="text-sm font-bold text-gray-950">How ordering works</p>
                <ol className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
                  <li>1. Send your order request.</li>
                  <li>2. Pastor Dee follows up with payment and delivery details.</li>
                  <li>3. Confirm the details and complete your order.</li>
                </ol>
              </div>
            </div>

            <aside id="order-form" className="scroll-mt-28 lg:col-span-12 xl:col-span-4">
              <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(54,35,18,0.09)] sm:p-8 xl:sticky xl:top-28">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-700">
                  Order request
                </p>
                <h2 className="mt-2 font-playfair text-3xl font-semibold text-gray-950">
                  Order your copy
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Pastor Dee will contact you with payment and delivery details.
                </p>
                <div className="mt-6">
                  <BookOrderForm
                    bookSlug={book.slug}
                    bookTitle={book.title}
                    bookPrice={book.price}
                  />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {book.highlights.length > 0 && (
        <section className="border-b border-stone-200 py-16 lg:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-700">
                  What this book offers
                </p>
                <h2 className="mt-3 font-playfair text-3xl font-semibold text-gray-950 sm:text-4xl">
                  A practical next step for your growth
                </h2>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {book.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-4 rounded-2xl bg-[#faf7f2] p-5 text-sm font-semibold leading-6 text-gray-800">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-800 text-brand-gold" aria-hidden="true">
                      &#10003;
                    </span>
                    <span className="pt-0.5">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {book.isBundle && bundleBooks.length > 0 && (
        <RelatedBooks books={bundleBooks} bundleIncludes />
      )}
      {!book.isBundle && related.length > 0 && (
        <RelatedBooks books={related} />
      )}
    </div>
  );
}
