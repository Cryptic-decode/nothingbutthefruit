import type { Book } from '../lib/books';
import BookCard from './BookCard';
import Container from './ui/Container';

interface RelatedBooksProps {
  books: Book[];
  bundleIncludes?: boolean;
}

export default function RelatedBooks({ books, bundleIncludes }: RelatedBooksProps) {
  if (books.length === 0) return null;

  return (
    <section className="bg-white py-20 lg:py-24">
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-700">
              {bundleIncludes ? 'Bundle contents' : 'Keep exploring'}
            </p>
            <h2 className="mt-3 font-playfair text-3xl font-semibold text-gray-950 sm:text-4xl">
              {bundleIncludes ? "What's included" : 'You may also like'}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-gray-600">
            {bundleIncludes
              ? 'Each title is also available to view individually.'
              : 'Continue exploring books from this collection.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </Container>
    </section>
  );
}
