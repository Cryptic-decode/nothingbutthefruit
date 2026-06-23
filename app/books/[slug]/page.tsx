import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBookBySlug, getAllBooks, getRelatedBooks, getBookDisplayImage, getBookDisplayVariant } from '../../lib/books';
import type { Book } from '../../lib/books';
import BookMockup from '../../components/BookMockup';
import BookOrderForm from '../../components/BookOrderForm';
import RelatedBooks from '../../components/RelatedBooks';

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
        .map((s) => getBookBySlug(s))
        .filter((b): b is Book => b !== undefined)
    : [];

  const baseUrl = 'https://nothingbutthefruit.com';

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Book Schema */}
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
                  hasPart: (book.bundleIncludes ?? []).map((s) => {
                    const included = getBookBySlug(s);
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

      {/* Hero — minimal, with focus on the book */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-20 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Cover Image */}
            <div
              className={`relative mx-auto w-full ${
                book.coverAspect === 'landscape'
                  ? 'max-w-lg aspect-video'
                  : 'max-w-xs aspect-[3/4]'
              }`}
            >
              <BookMockup
                src={getBookDisplayImage(book)}
                alt={book.title}
                variant={getBookDisplayVariant(book)}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full"
              />
            </div>

            {/* Details */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {book.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 justify-center lg:justify-start">
                <span className="text-2xl sm:text-3xl font-bold text-brand-gold">
                  ${book.price.toFixed(2)}
                </span>
                {book.regularValue && (
                  <span className="text-base sm:text-lg text-purple-200/60 line-through">
                    ${book.regularValue.toFixed(2)}
                  </span>
                )}
                {book.savings && (
                  <span className="inline-block bg-green-500/20 text-green-400 text-sm font-bold px-3 py-1 rounded-full border border-green-500/30">
                    {book.savings}
                  </span>
                )}
              </div>

              <p className="mt-5 text-base sm:text-lg text-purple-200/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {book.description}
              </p>

              {/* Highlights */}
              {book.highlights.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {book.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-3 text-purple-200/80 justify-center lg:justify-start">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      <span className="text-sm sm:text-base">{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-purple-700 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                <span className="w-6 h-px bg-purple-300" />
                Order
                <span className="w-6 h-px bg-purple-300" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Order Your Copy
              </h2>
              <p className="mt-2 text-gray-500">
                Pastor Dee will contact you with payment and delivery details.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <BookOrderForm
                bookSlug={book.slug}
                bookTitle={book.title}
                bookPrice={book.price}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Included Items or Related Books */}
      {book.isBundle && bundleBooks.length > 0 && (
        <RelatedBooks books={bundleBooks} bundleIncludes />
      )}
      {!book.isBundle && related.length > 0 && (
        <RelatedBooks books={related} />
      )}
    </div>
  );
}
