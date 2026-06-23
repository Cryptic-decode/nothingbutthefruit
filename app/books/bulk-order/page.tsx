'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Toast from '../../components/Toast';
import BookMockup from '../../components/BookMockup';
import { AnimatedSection } from '../../components/ScrollAnimations';
import { getAllBooks, getBookDisplayImage, getBookDisplayVariant } from '../../lib/books';
import type { BookDisplayVariant } from '../../lib/books';

interface BookOrder {
  slug: string;
  title: string;
  price: number;
  displayImage: string;
  displayVariant: BookDisplayVariant;
  quantity: number;
}

export default function BulkOrderPage() {
  const books = getAllBooks();

  const [orders, setOrders] = useState<BookOrder[]>(
    books.map((b) => ({
      slug: b.slug,
      title: b.title,
      price: b.price,
      displayImage: getBookDisplayImage(b),
      displayVariant: getBookDisplayVariant(b),
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
        setOrders(books.map((b) => ({
            slug: b.slug,
            title: b.title,
            price: b.price,
            displayImage: getBookDisplayImage(b),
            displayVariant: getBookDisplayVariant(b),
            quantity: 0,
          })));
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
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-20 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Bulk{' '}
            <span className="text-brand-black bg-brand-gold px-3 py-1 rounded-lg inline-block -rotate-1 shadow-2xl">
              Order
            </span>
          </h1>
          <p className="mt-4 text-lg text-purple-200/80 max-w-xl mx-auto">
            Order multiple books at once for your church, small group, or ministry
          </p>
        </div>
      </section>

      {/* Bulk Order Form */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50/30">
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
            <AnimatedSection className="max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Select Books &amp; Quantities
              </h2>

              <div className="space-y-3">
                {orders.map((order, i) => (
                  <motion.div
                    key={order.slug}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 flex items-center gap-4 border ${
                      order.quantity > 0 ? 'border-brand-gold/40 bg-amber-50/30' : 'border-gray-100'
                    }`}
                  >
                    <div className="relative w-12 h-16 flex-shrink-0">
                      <BookMockup
                        src={order.displayImage}
                        alt={order.title}
                        variant={order.displayVariant}
                        sizes="48px"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/books/${order.slug}`}
                        className="font-semibold text-gray-900 hover:text-purple-700 transition-colors duration-200 line-clamp-1 text-sm"
                      >
                        {order.title}
                      </Link>
                      <p className="text-brand-gold font-bold text-xs mt-0.5">
                        ${order.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <label className="sr-only" htmlFor={`qty-${order.slug}`}>
                        Quantity for {order.title}
                      </label>
                      <select
                        id={`qty-${order.slug}`}
                        value={order.quantity}
                        onChange={(e) =>
                          handleQuantityChange(order.slug, parseInt(e.target.value, 10))
                        }
                        className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors duration-200 text-sm bg-white"
                      >
                        {Array.from({ length: 101 }, (_, i) => i).map(
                          (num) => (
                            <option key={num} value={num}>
                              {num === 0 ? '0' : num}
                            </option>
                          )
                        )}
                      </select>
                      <span className="text-xs text-gray-400 w-12 text-right">
                        {order.quantity > 0
                          ? `$${(order.quantity * order.price).toFixed(2)}`
                          : ''}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Order Summary */}
            {selectedOrders.length > 0 && (
              <AnimatedSection className="max-w-lg mx-auto mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-brand-gold/30">
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
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">
                      Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                    </span>
                    <span className="text-xl font-bold text-brand-gold">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Customer Details */}
            <AnimatedSection className="max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Information
              </h2>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-gray-900 mb-1.5"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors duration-200 text-sm"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-1.5"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors duration-200 text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-900 mb-1.5"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors duration-200 text-sm"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <button
                  type="submit"
                  disabled={selectedOrders.length === 0}
                  className={`w-full font-bold py-3.5 px-6 rounded-lg transition-all duration-300 text-sm ${
                    selectedOrders.length === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-brand-gold hover:bg-amber-500 text-brand-black hover:shadow-lg'
                  }`}
                >
                  Submit Bulk Order
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree that Pastor Dee will contact you with
                  payment and delivery details.
                </p>
              </div>
            </AnimatedSection>
          </form>
        </div>
      </section>
    </div>
  );
}
