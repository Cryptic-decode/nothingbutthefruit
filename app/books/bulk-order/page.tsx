'use client';

import { useState } from 'react';
import Link from 'next/link';
import Toast from '../../components/Toast';
import BookMockup from '../../components/BookMockup';
import { getAllBooks } from '../../lib/books';

// Metadata must be exported from a layout or page file — but since this is a client component,
// we export it from a separate layout file below the function. Actually in Next.js App Router,
// metadata can only be exported from server components. Let's handle this differently.

interface BookOrder {
  slug: string;
  title: string;
  price: number;
  coverImage: string;
  quantity: number;
}

export default function BulkOrderPage() {
  const books = getAllBooks();

  const [orders, setOrders] = useState<BookOrder[]>(
    books.map((b) => ({
      slug: b.slug,
      title: b.title,
      price: b.price,
      coverImage: b.coverImage,
      quantity: 0,
    }))
  );

  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const selectedOrders = orders.filter((o) => o.quantity > 0);
  const totalItems = selectedOrders.reduce((sum, o) => sum + o.quantity, 0);
  const totalAmount = selectedOrders.reduce(
    (sum, o) => sum + o.quantity * o.price,
    0
  );

  const handleQuantityChange = (slug: string, quantity: number) => {
    setOrders((prev) =>
      prev.map((o) => (o.slug === slug ? { ...o, quantity } : o))
    );
  };

  const handleCustomerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedOrders.length === 0) {
      setToast({
        message: 'Please select at least one book to order.',
        type: 'error',
        isVisible: true,
      });
      return;
    }

    const submitButton = e.currentTarget.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    try {
      const response = await fetch('/api/bulk-book-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...customer,
          items: selectedOrders.map((o) => ({
            bookSlug: o.slug,
            bookTitle: o.title,
            bookPrice: o.price,
            quantity: o.quantity,
          })),
          website: '',
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
        setOrders(books.map((b) => ({ ...b, quantity: 0 })));
        setCustomer({ fullName: '', email: '', phone: '' });
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
        message:
          'Something went wrong. Please try again or contact us directly.',
        type: 'error',
        isVisible: true,
      });
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />

      {/* Hero */}
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
                id="waves-bulk"
                x="0"
                y="0"
                width="200"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path d="M0,50 Q50,0 100,50 T200,50" stroke="#F59E0B" strokeWidth="2" fill="none" />
                <path d="M0,70 Q50,20 100,70 T200,70" stroke="#A855F7" strokeWidth="1.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves-bulk)" />
          </svg>
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold opacity-10 rounded-lg blur-xl animate-float" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in">
            Bulk{' '}
            <span className="text-brand-black bg-brand-gold px-3 py-1 rounded-lg inline-block transform -rotate-1 shadow-2xl hover:scale-110 transition-all duration-300 cursor-default">
              Order
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Order multiple books at once for your church, small group, or ministry
          </p>
        </div>
      </section>

      {/* Bulk Order Form */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              style={{
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px',
                overflow: 'hidden',
                opacity: 0,
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            />

            {/* Book Selection */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Books &amp; Quantities
              </h2>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.slug}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center gap-4"
                  >
                    <div className="relative w-14 h-20 flex-shrink-0">
                      <BookMockup
                        src={order.coverImage}
                        alt={order.title}
                        sizes="56px"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/books/${order.slug}`}
                        className="font-semibold text-gray-900 hover:text-purple-700 transition-colors duration-200 line-clamp-1"
                      >
                        {order.title}
                      </Link>
                      <p className="text-brand-gold font-bold text-sm mt-0.5">
                        ${order.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <label className="sr-only" htmlFor={`qty-${order.slug}`}>
                        Quantity for {order.title}
                      </label>
                      <select
                        id={`qty-${order.slug}`}
                        value={order.quantity}
                        onChange={(e) =>
                          handleQuantityChange(order.slug, parseInt(e.target.value, 10))
                        }
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors duration-200 text-sm"
                      >
                        {Array.from({ length: 101 }, (_, i) => i).map(
                          (num) => (
                            <option key={num} value={num}>
                              {num === 0 ? '0' : num}
                            </option>
                          )
                        )}
                      </select>
                      <span className="text-sm text-gray-500 w-12">
                        {order.quantity > 0
                          ? `$${(order.quantity * order.price).toFixed(2)}`
                          : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            {selectedOrders.length > 0 && (
              <div className="max-w-xl mx-auto mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-brand-gold">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-2 mb-4">
                    {selectedOrders.map((o) => (
                      <div
                        key={o.slug}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600 truncate mr-4">
                          {o.title} &times; {o.quantity}
                        </span>
                        <span className="font-semibold text-gray-900">
                          ${(o.quantity * o.price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                    </span>
                    <span className="text-2xl font-bold text-brand-gold">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Details */}
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Information
              </h2>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={customer.fullName}
                    onChange={handleCustomerChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors duration-200"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={customer.email}
                    onChange={handleCustomerChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={customer.phone}
                    onChange={handleCustomerChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors duration-200"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <button
                  type="submit"
                  disabled={selectedOrders.length === 0}
                  className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg ${
                    selectedOrders.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-brand-gold hover:bg-amber-500 text-brand-black'
                  }`}
                >
                  Submit Bulk Order
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree that Pastor Dee will contact you with
                  payment and delivery details.
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
