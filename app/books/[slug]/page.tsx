import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBookBySlug, getAllBooks, getRelatedBooks } from '../../lib/books';
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

      {/* Hero with Cover + Details */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
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
                id="waves-book-detail"
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
            <rect width="100%" height="100%" fill="url(#waves-book-detail)" />
          </svg>
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold opacity-10 rounded-lg blur-xl animate-float" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-400 opacity-5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Cover Image with 3D Book Mockup */}
            <div
              className={`relative mx-auto w-full ${
                book.coverAspect === 'landscape'
                  ? 'max-w-lg aspect-video'
                  : 'max-w-xs aspect-[3/4]'
              }`}
            >
              <BookMockup
                src={book.coverImage}
                alt={book.title}
                aspect={book.coverAspect}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full"
              />
            </div>

            {/* Details */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                {book.title}
              </h1>
              <p className="mt-4 text-3xl font-bold text-brand-gold">
                ${book.price.toFixed(2)}
                {book.savings && (
                  <span className="ml-3 text-sm text-white bg-green-500 px-2 py-1 rounded-full font-semibold align-middle">
                    {book.savings}
                  </span>
                )}
              </p>
              {book.regularValue && (
                <p className="mt-1 text-gray-400 line-through text-sm">
                  Regular value ${book.regularValue.toFixed(2)}
                </p>
              )}
              <p className="mt-6 text-lg text-gray-200 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {book.description}
              </p>

              {/* Highlights */}
              {book.highlights.length > 0 && (
                <ul className="mt-6 space-y-2">
                  {book.highlights.map((h, i) => (
                    <li key={i} className="flex items-start text-gray-200">
                      <span className="text-brand-gold mr-2 font-bold">
                        &#x2022;
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Order Your Copy
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Pastor Dee will contact you with payment and delivery details.
            </p>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
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
