import Link from 'next/link';
import type { PublishedEbook } from '../lib/ebooks';
import { entityIds, siteConfig } from '../lib/site';
import BookMockup from './BookMockup';
import JsonLd from './JsonLd';
import ButtonLink from './ui/ButtonLink';
import Container from './ui/Container';

interface EbookDetailProps {
  book: PublishedEbook;
}

export default function EbookDetail({ book }: EbookDetailProps) {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Book',
          '@id': `${siteConfig.url}/books/${book.slug}#book`,
          name: book.title,
          description: book.description,
          bookFormat: 'https://schema.org/EBook',
          author: { '@id': entityIds.author },
          publisher: { '@id': entityIds.organization },
          image: book.coverUrl,
          url: `${siteConfig.url}/books/${book.slug}`,
        }}
      />

      <section className="border-b border-stone-200 bg-[#faf7f2] py-6">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/books?format=ebooks" className="font-semibold text-purple-700 hover:text-purple-900">
              eBooks
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
              <div className="relative mx-auto aspect-[3/4] w-full max-w-md rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_24px_70px_rgba(54,35,18,0.10)] sm:p-10">
                <BookMockup
                  src={book.coverUrl}
                  alt={book.coverAlt}
                  priority
                  sizes="(max-width: 1024px) 80vw, 32vw"
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className="lg:col-span-7 xl:col-span-5 xl:pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-700">
                Digital edition
              </p>
              <h1 className="mt-4 font-playfair text-4xl font-semibold leading-[1.08] tracking-tight text-gray-950 sm:text-5xl">
                {book.title}
              </h1>
              <p className="mt-4 text-sm font-semibold text-gray-500">By Pastor Demetria Bass</p>
              <p className="mt-7 text-3xl font-bold text-gray-950">${book.price.toFixed(2)}</p>
              <p className="mt-6 text-base leading-8 text-gray-700">{book.description}</p>

              <div className="mt-8 rounded-2xl border border-purple-200 bg-purple-50 p-5">
                <p className="font-bold text-purple-950">Online checkout is coming next</p>
                <p className="mt-2 text-sm leading-6 text-purple-900">
                  Secure payment and immediate download are not active yet. No download file is publicly available.
                </p>
                <ButtonLink href="/contact" variant="dark" className="mt-5">
                  Ask about this eBook
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
