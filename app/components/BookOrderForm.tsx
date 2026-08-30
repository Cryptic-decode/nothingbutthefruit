'use client';

import Link from 'next/link';
import { useState } from 'react';
import Toast from './Toast';

interface BookOrderFormProps {
  bookSlug: string;
  bookTitle: string;
  bookPrice: number;
}

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  quantity: 1,
  website: '',
};

const inputClasses =
  'w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-gray-950 transition-colors placeholder:text-gray-400 focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20';

export default function BookOrderForm({ bookSlug, bookTitle, bookPrice }: BookOrderFormProps) {
  const [formData, setFormData] = useState(initialFormData);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/book-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          bookSlug,
          bookTitle,
          bookPrice,
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
        setFormData(initialFormData);
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
        message: 'Something went wrong. Please try again or contact us directly.',
        type: 'error',
        isVisible: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value =
      event.target.name === 'quantity'
        ? Number.parseInt(event.target.value, 10)
        : event.target.value;
    setFormData((current) => ({ ...current, [event.target.name]: value }));
  };

  const totalAmount = (formData.quantity * bookPrice).toFixed(2);

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((current) => ({ ...current, isVisible: false }))}
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
          className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
          aria-hidden="true"
        />

        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-bold text-gray-900">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            autoComplete="name"
            value={formData.fullName}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="mb-1.5 block text-sm font-bold text-gray-900">
            Quantity <span aria-hidden="true">*</span>
          </label>
          <select
            id="quantity"
            name="quantity"
            required
            aria-describedby="quantity-help"
            value={formData.quantity}
            onChange={handleChange}
            className={inputClasses}
          >
            {Array.from({ length: 20 }, (_, index) => index + 1).map((number) => (
              <option key={number} value={number}>
                {number} {number === 1 ? 'copy' : 'copies'}
              </option>
            ))}
          </select>
          <p id="quantity-help" className="mt-2 text-xs leading-5 text-gray-500">
            Need more than 20 copies?{' '}
            <Link href="/books/bulk-order" className="font-bold text-purple-700 hover:text-purple-900">
              Start a bulk order
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-[#faf7f2] px-4 py-3">
          <span className="text-sm font-bold text-gray-700">Estimated total</span>
          <span className="text-xl font-bold text-gray-950">${totalAmount}</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-12 w-full rounded-full bg-brand-gold px-6 py-3 font-bold text-brand-black shadow-md transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-lg disabled:cursor-wait disabled:opacity-65 disabled:hover:translate-y-0"
        >
          {isSubmitting ? 'Submitting order…' : 'Submit order request'}
        </button>

        <p className="text-center text-xs leading-5 text-gray-500">
          By submitting, you agree that Pastor Dee may contact you about payment and delivery.
        </p>
      </form>
    </>
  );
}
