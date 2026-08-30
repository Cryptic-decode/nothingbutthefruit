import ButtonLink from '../components/ui/ButtonLink';

export default function BookNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="text-8xl font-bold text-brand-gold opacity-20 select-none">
          Book
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mt-4">
          Book Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          We could not find the book you are looking for. It may have been
          moved or the link may be incorrect.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonLink
            href="/books"
          >
            Browse All Books
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="outline-dark"
          >
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
