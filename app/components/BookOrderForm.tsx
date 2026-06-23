'use client';

import { useState } from 'react';
import Toast from './Toast';

interface BookOrderFormProps {
  bookSlug: string;
  bookTitle: string;
  bookPrice: number;
}

export default function BookOrderForm({ bookSlug, bookTitle, bookPrice }: BookOrderFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    quantity: 1,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitButton = e.currentTarget.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    try {
      const response = await fetch('/api/book-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          bookSlug,
          bookTitle,
          bookPrice,
          website: '',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setToast({
          message:
            'Thank you for your order! Pastor Dee will contact you soon with payment and delivery details.',
          type: 'success',
          isVisible: true,
        });
        setFormData({ fullName: '', email: '', phone: '', quantity: 1 });
      } else {
        setToast({
          message: result.error || 'Something went wrong. Please try again.',
          type: 'error',
          isVisible: true,
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.name === 'quantity'
        ? parseInt(e.target.value, 10)
        : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const totalAmount = (formData.quantity * bookPrice).toFixed(2);

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
      <form onSubmit={handleSubmit} className="space-y-6">
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
            value={formData.fullName}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors duration-200"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Quantity *
          </label>
          <select
            id="quantity"
            name="quantity"
            required
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors duration-200"
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'copy' : 'copies'}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Need more than 20 copies?{' '}
            <a href="/contact" className="text-brand-gold hover:underline">
              Contact us
            </a>
          </p>
        </div>

        <div className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-semibold">Total Amount:</span>
            <span className="text-2xl font-bold text-brand-gold">
              ${totalAmount}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg bg-brand-gold hover:bg-amber-500 text-brand-black"
        >
          Submit Order
        </button>

        <p className="text-xs text-gray-500 text-center">
          By submitting, you agree that Pastor Dee will contact you with payment
          and delivery details.
        </p>
      </form>
    </>
  );
}
