'use client';

import Link from 'next/link';
import { useState } from 'react';
import BookMockup from '../../components/BookMockup';
import Toast from '../../components/Toast';
import Container from '../../components/ui/Container';
import {
  getAllBooks,
  getBookDisplayImage,
  getBookDisplayVariant,
} from '../../lib/books';
import type { BookDisplayVariant } from '../../lib/books';
import { getFormSubmissionError } from '../../lib/formErrors';

interface BookOrder {
  slug: string;
  title: string;
  price: number;
  displayImage: string;
  displayVariant: BookDisplayVariant;
  quantity: number;
}

const catalogBooks = getAllBooks();

function createInitialOrders(): BookOrder[] {
  return catalogBooks.map((book) => ({
    slug: book.slug,
    title: book.title,
    price: book.price,
    displayImage: getBookDisplayImage(book),
    displayVariant: getBookDisplayVariant(book),
    quantity: 0,
  }));
}

const inputClasses =
  'w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-gray-950 transition-colors placeholder:text-gray-400 focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20';

export default function BulkOrderPage() {
  const [orders, setOrders] = useState<BookOrder[]>(createInitialOrders);
  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const selectedOrders = orders.filter((order) => order.quantity > 0);
  const totalItems = selectedOrders.reduce((sum, order) => sum + order.quantity, 0);
  const totalAmount = selectedOrders.reduce(
    (sum, order) => sum + order.quantity * order.price,
    0
  );

  const handleQuantityChange = (slug: string, quantity: number) => {
    setOrders((current) =>
      current.map((order) => (order.slug === slug ? { ...order, quantity } : order))
    );
  };

  const handleCustomerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedOrders.length === 0) {
      setToast({
        message: 'Please select at least one book to order.',
        type: 'error',
        isVisible: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bulk-book-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...customer,
          items: selectedOrders.map((order) => ({
            bookSlug: order.slug,
            bookTitle: order.title,
            bookPrice: order.price,
            quantity: order.quantity,
          })),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setToast({
          message:
            'Thank you for your bulk order! Pastor Dee will contact you soon with payment and delivery details.',
          type: 'success',
          isVisible: true,
        });
        setOrders(createInitialOrders());
        setCustomer({ fullName: '', email: '', phone: '', website: '' });
      } else {
        setToast({
          message: result.error || 'Something went wrong. Please try again.',
          type: 'error',
          isVisible: true,
        });
      }
    } catch (error) {
      console.error('Bulk order submission error:', error);
      setToast({
        message: getFormSubmissionError(
          'Something went wrong. Please try again or contact us directly.'
        ),
        type: 'error',
        isVisible: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((current) => ({ ...current, isVisible: false }))}
      />

      <section className="border-b border-stone-200 bg-[#f7f0e5] py-14 lg:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/books" className="font-semibold text-purple-700 hover:text-purple-900">
              Books
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Bulk order</span>
          </nav>
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
              Group ordering
            </p>
            <h1 className="mt-4 font-playfair text-5xl font-semibold tracking-tight text-gray-950 sm:text-6xl">
              Build your bulk book order.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-700">
              Choose multiple books and quantities for your church, small group, or ministry. Pastor Dee will follow up with payment and delivery details.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={customer.website}
              onChange={handleCustomerChange}
              className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
              aria-hidden="true"
            />

            <fieldset disabled={isSubmitting} className="min-w-0 disabled:opacity-75">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)] xl:gap-14">
              <div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-700">
                      Step 1
                    </p>
                    <h2 className="mt-2 font-playfair text-3xl font-semibold text-gray-950">
                      Select books and quantities
                    </h2>
                  </div>
                  <p className="hidden text-sm text-gray-500 sm:block">Up to 100 copies per title</p>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {orders.map((order) => (
                    <article
                      key={order.slug}
                      className={`rounded-2xl border p-4 transition-[border-color,background-color,box-shadow] ${
                        order.quantity > 0
                          ? 'border-brand-gold bg-amber-50/50 shadow-sm'
                          : 'border-stone-200 bg-white'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="relative h-24 w-20 shrink-0 rounded-lg bg-[#f7f0e5] p-2">
                          <BookMockup
                            src={order.displayImage}
                            alt={order.title}
                            variant={order.displayVariant}
                            sizes="80px"
                            className="h-full w-full"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/books/${order.slug}`}
                            className="line-clamp-2 text-sm font-bold leading-5 text-gray-950 hover:text-purple-800"
                          >
                            {order.title}
                          </Link>
                          <p className="mt-1 text-sm font-bold text-purple-700">
                            ${order.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-200 pt-3">
                        <label htmlFor={`qty-${order.slug}`} className="text-sm font-bold text-gray-700">
                          Quantity
                        </label>
                        <select
                          id={`qty-${order.slug}`}
                          value={order.quantity}
                          onChange={(event) =>
                            handleQuantityChange(order.slug, Number.parseInt(event.target.value, 10))
                          }
                          className="min-h-11 w-24 rounded-lg border border-stone-300 bg-white px-3 text-sm font-semibold focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20"
                        >
                          {Array.from({ length: 101 }, (_, index) => index).map((number) => (
                            <option key={number} value={number}>
                              {number}
                            </option>
                          ))}
                        </select>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-14">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-700">
                    Step 2
                  </p>
                  <h2 className="mt-2 font-playfair text-3xl font-semibold text-gray-950">
                    Your information
                  </h2>
                  <div className="mt-7 grid gap-5 rounded-2xl border border-stone-200 bg-[#faf7f2] p-6 sm:grid-cols-2 sm:p-8">
                    <div className="sm:col-span-2">
                      <label htmlFor="fullName" className="mb-1.5 block text-sm font-bold text-gray-900">
                        Full name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        autoComplete="name"
                        value={customer.fullName}
                        onChange={handleCustomerChange}
                        className={inputClasses}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-gray-900">
                        Email address <span aria-hidden="true">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        value={customer.email}
                        onChange={handleCustomerChange}
                        className={inputClasses}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-bold text-gray-900">
                        Phone number <span aria-hidden="true">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        autoComplete="tel"
                        value={customer.phone}
                        onChange={handleCustomerChange}
                        className={inputClasses}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <aside className="lg:sticky lg:top-28">
                <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(54,35,18,0.09)] sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-700">
                    Order summary
                  </p>
                  <h2 className="mt-2 font-playfair text-3xl font-semibold text-gray-950">
                    Review your request
                  </h2>

                  {selectedOrders.length > 0 ? (
                    <div className="mt-6 space-y-4">
                      {selectedOrders.map((order) => (
                        <div key={order.slug} className="flex justify-between gap-5 text-sm">
                          <span className="leading-5 text-gray-600">
                            {order.title} <strong className="text-gray-950">&times; {order.quantity}</strong>
                          </span>
                          <span className="shrink-0 font-bold text-gray-950">
                            ${(order.quantity * order.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-6 rounded-xl bg-[#faf7f2] p-4 text-sm leading-6 text-gray-600">
                      Select a quantity for at least one book to begin your order.
                    </p>
                  )}

                  <div className="mt-6 border-t border-stone-200 pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold text-gray-900">
                        Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                      </span>
                      <span className="text-2xl font-bold text-gray-950">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={selectedOrders.length === 0 || isSubmitting}
                    className="mt-6 min-h-12 w-full rounded-full bg-brand-gold px-6 py-3 font-bold text-brand-black shadow-md transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500 disabled:shadow-none disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? 'Submitting order…' : 'Submit bulk order request'}
                  </button>
                  <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                    Pastor Dee will contact you with payment and delivery details.
                  </p>
                </div>

                <Link
                  href="/books"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-purple-700 hover:text-purple-900"
                >
                  <span aria-hidden="true">&larr;</span>
                  Back to all books
                </Link>
              </aside>
            </div>
            </fieldset>
          </form>
        </Container>
      </section>
    </div>
  );
}
