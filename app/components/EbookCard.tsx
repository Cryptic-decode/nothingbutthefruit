'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import BookMockup from './BookMockup';

interface EbookCardProps {
  book: {
    slug: string;
    title: string;
    description: string;
    price: number;
    coverUrl: string;
    coverAlt: string;
  };
}

export default function EbookCard({ book }: EbookCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="group flex h-full flex-col"
    >
      <Link
        href={`/books/${book.slug}`}
        className="flex h-full flex-col rounded-[1.25rem] border border-stone-200 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_18px_45px_rgba(76,29,149,0.10)] sm:p-5"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#f7f2e9] p-5 sm:p-7">
          <BookMockup
            src={book.coverUrl}
            alt=""
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="h-full w-full"
          />
          <span className="absolute left-3 top-3 rounded-full bg-purple-800 px-3 py-1 text-xs font-bold text-white shadow-sm">
            Digital edition
          </span>
        </div>

        <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-purple-700">
            eBook
          </p>
          <h3 className="mt-2 font-playfair text-xl font-semibold leading-snug text-gray-950 transition-colors group-hover:text-purple-800">
            {book.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
            {book.description}
          </p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-5">
            <span className="block text-lg font-bold text-gray-950">
              ${book.price.toFixed(2)}
            </span>
            <span className="text-sm font-bold text-purple-700">View eBook</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
