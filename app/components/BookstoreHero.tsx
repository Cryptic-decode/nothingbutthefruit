import type { Book } from '../lib/books';
import { getBookDisplayImage, getBookDisplayVariant } from '../lib/books';
import BookMockup from './BookMockup';
import ButtonLink from './ui/ButtonLink';
import Container from './ui/Container';

interface BookstoreHeroProps {
  books: Book[];
}

const bookPositions = [
  'bottom-[17%] left-[2%] z-20 w-[39%] -rotate-3 lg:left-[-1%] lg:w-[40%]',
  'bottom-[21%] left-[30%] z-30 w-[43%] lg:left-[30%] lg:w-[43%]',
  'bottom-[18%] right-[1%] z-20 w-[35%] rotate-2 lg:right-[-3%] lg:w-[37%]',
];

function OrchardLineArt() {
  return (
    <svg
      aria-hidden="true"
      className="absolute right-[-6%] top-[3%] z-10 h-[46%] w-[58%] text-brand-gold opacity-35 sm:right-0 sm:w-[52%] lg:right-[-5vw] lg:h-[42%] lg:w-[62%]"
      viewBox="0 0 560 300"
      fill="none"
    >
      <path d="M572 52C453 49 369 89 302 145C241 195 169 219 46 220" stroke="currentColor" strokeWidth="2" />
      <path d="M455 78C450 42 464 21 498 7C504 43 490 66 455 78Z" stroke="currentColor" strokeWidth="2" />
      <path d="M395 104C377 70 380 43 406 20C424 54 420 82 395 104Z" stroke="currentColor" strokeWidth="2" />
      <path d="M337 139C308 115 300 90 315 58C344 81 351 108 337 139Z" stroke="currentColor" strokeWidth="2" />
      <path d="M279 172C248 154 234 131 241 98C272 115 287 138 279 172Z" stroke="currentColor" strokeWidth="2" />
      <path d="M221 195C184 188 164 170 160 137C197 143 217 162 221 195Z" stroke="currentColor" strokeWidth="2" />
      <path d="M473 77C490 101 515 111 549 107C534 79 508 69 473 77Z" stroke="currentColor" strokeWidth="2" />
      <path d="M411 108C431 133 458 141 491 132C471 106 444 98 411 108Z" stroke="currentColor" strokeWidth="2" />
      <path d="M351 146C375 168 403 171 434 157C409 134 381 131 351 146Z" stroke="currentColor" strokeWidth="2" />
      <path d="M292 178C319 197 347 197 375 179C347 159 319 158 292 178Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="452" cy="87" r="22" stroke="currentColor" strokeWidth="2" />
      <circle cx="386" cy="125" r="18" stroke="currentColor" strokeWidth="2" />
      <circle cx="324" cy="163" r="15" stroke="currentColor" strokeWidth="2" />
      <path d="M441 78C448 69 461 69 468 78M375 118C381 110 391 110 398 117M314 157C319 151 328 151 333 157" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function BookstoreHero({ books }: BookstoreHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-stone-200 bg-[#fbf7ef]">
      <div className="absolute inset-y-0 right-0 hidden w-[54%] rounded-tl-[16rem] border-l-[7px] border-t-[7px] border-brand-gold/70 bg-purple-950 lg:block" />

      <Container className="relative grid min-h-[42rem] items-center gap-8 py-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5 lg:py-0">
        <div className="relative z-30 max-w-2xl lg:py-16 lg:pl-12">
          <div className="absolute bottom-2 left-0 top-2 hidden w-px bg-brand-gold/70 lg:block">
            <span className="absolute -left-[5px] -top-1 h-2.5 w-2.5 rounded-full bg-brand-gold" />
            <span className="absolute -bottom-1 -left-[5px] h-2.5 w-2.5 rounded-full bg-brand-gold" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.22em] text-purple-800">
            The Nothing But The Fruit bookstore
          </p>
          <h1 className="mt-6 max-w-[35rem] font-playfair text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-gray-950 sm:text-6xl lg:text-[4.75rem] xl:text-[5.25rem]">
            Books for a fruitful life.
          </h1>
          <p className="mt-7 max-w-[36rem] text-lg leading-8 text-gray-700">
            Resources to help you grow deeper in your walk with God, from practical teaching to devotional and couples-focused guides.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#book-collections" size="lg" className="whitespace-nowrap">
              Browse all books
            </ButtonLink>
            <ButtonLink href="/books/bulk-order" size="lg" variant="outline-dark" className="whitespace-nowrap">
              Bulk orders
            </ButtonLink>
          </div>
        </div>

        <div className="relative z-20 mx-auto h-[18rem] w-full max-w-2xl sm:h-[32rem] lg:h-full lg:min-h-[42rem] lg:max-w-none lg:translate-x-6">
          <div className="absolute inset-x-0 bottom-[4%] top-[2%] rounded-t-[8rem] border-t-4 border-brand-gold/70 bg-purple-950 lg:hidden" />
          <OrchardLineArt />

          <div className="absolute bottom-[6%] left-[-5%] right-[-8%] z-10 h-[25%] rounded-[2.25rem] border-y-2 border-brand-gold/70 bg-[#efe1c7] shadow-[0_24px_55px_rgba(55,32,12,0.22)] lg:left-[-8%] lg:right-[-12vw] lg:rounded-[3rem_0_0_3rem]" />
          <div className="absolute bottom-[24%] left-[36%] z-20 h-[12%] w-[31%] rounded-[50%] border-2 border-brand-gold/60 bg-[#f7ead3] shadow-[0_16px_30px_rgba(55,32,12,0.18)]" />

          {books.map((book, index) => (
            <div
              key={book.slug}
              className={`absolute aspect-[3/4] transform-gpu ${bookPositions[index]}`}
            >
              <BookMockup
                src={getBookDisplayImage(book)}
                alt={book.title}
                variant={getBookDisplayVariant(book)}
                priority={index === 1}
                sizes="(max-width: 640px) 38vw, (max-width: 1024px) 32vw, 23vw"
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
