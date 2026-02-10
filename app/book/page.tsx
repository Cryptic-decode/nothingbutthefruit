'use client';

import { useState } from 'react';
import Toast from '../components/Toast';

export default function Book() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    quantity: 1
  });

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  // Preorder window: 2 weeks starting from launch date (Feb 10 - Feb 24, 2026)
  const launchDate = new Date('2026-02-10');
  const preorderStartDate = new Date(launchDate);
  const preorderEndDate = new Date(launchDate);
  preorderEndDate.setDate(preorderEndDate.getDate() + 14); // 2 weeks after launch
  const now = new Date();
  const isPreorderActive = now >= preorderStartDate && now < preorderEndDate;
  const daysUntilLaunch = Math.ceil((launchDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const daysUntilPreorderEnds = isPreorderActive 
    ? Math.ceil((preorderEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const isBeforeLaunch = now < preorderStartDate;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    try {
      const response = await fetch('/api/preorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          website: '', // Honeypot field - always empty for real users
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setToast({
          message: 'Thank you for your preorder! Pastor Dee will contact you soon with next steps.',
          type: 'success',
          isVisible: true
        });
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          quantity: 1
        });
      } else {
        setToast({
          message: result.error || 'Something went wrong. Please try again.',
          type: 'error',
          isVisible: true
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setToast({
        message: 'Something went wrong. Please try again or contact us directly.',
        type: 'error',
        isVisible: true
      });
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === 'quantity' ? parseInt(e.target.value, 10) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const totalAmount = (formData.quantity * 19.95).toFixed(2);

  return (
    <div className="min-h-screen bg-white">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32" style={{
        background: 'linear-gradient(135deg, #581c87 0%, #312e81 50%, #111827 100%)',
        backgroundImage: 'linear-gradient(135deg, #581c87 0%, #312e81 50%, #111827 100%)',
        WebkitBackgroundClip: 'padding-box',
        backgroundClip: 'padding-box'
      }}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Wave pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="waves-book" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q50,0 100,50 T200,50" stroke="#F59E0B" strokeWidth="2" fill="none"/>
                <path d="M0,70 Q50,20 100,70 T200,70" stroke="#A855F7" strokeWidth="1.5" fill="none"/>
                <path d="M0,30 Q50,-20 100,30 T200,30" stroke="#EC4899" strokeWidth="1" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves-book)"/>
          </svg>

          {/* Geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold opacity-10 rounded-lg blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-400 opacity-5 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400 opacity-10 rounded-xl transform rotate-45 blur-lg animate-float" style={{animationDelay: '4s'}}></div>
          
          {/* Book icon */}
          <div className="absolute top-32 right-1/4 opacity-20 animate-float">
            <svg className="w-16 h-16 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H5V4h14v16zM7 6h10v2H7V6zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
            </svg>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/10 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in">
              What's your{" "}
              <span className="text-brand-black bg-brand-gold px-3 py-1 rounded-lg inline-block transform -rotate-1 shadow-2xl hover:scale-110 transition-all duration-300 cursor-default">
                fruit language?
              </span>
            </h1>
            
            <p className="mt-8 text-xl leading-8 text-gray-200 max-w-3xl mx-auto sm:text-2xl sm:leading-9 animate-fade-in" style={{animationDelay: '0.3s'}}>
              A powerful new book by Pastor Demetria Bass
            </p>
            
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.5s'}}>
              Discover the language of the Spirit and unlock the fruit God has placed within you. 
              Transform your spiritual walk with powerful biblical insights.
            </p>

            {isBeforeLaunch && (
              <div className="mt-10 animate-fade-in" style={{animationDelay: '0.7s'}}>
                <div className="inline-block bg-brand-gold text-brand-black px-6 py-3 rounded-full font-bold text-lg shadow-xl">
                  Launching February 10, 2026 • Pre-order Available Soon
                </div>
              </div>
            )}

            {isPreorderActive && (
              <div className="mt-10 animate-fade-in" style={{animationDelay: '0.7s'}}>
                <div className="inline-block bg-brand-gold text-brand-black px-6 py-3 rounded-full font-bold text-lg shadow-xl mb-3">
                  🎉 Limited Time: $19.95 + FREE Delivery
                </div>
                <div className="mt-3 space-y-2">
                  <p className="text-white text-base font-semibold">
                    ⏰ Free delivery ends in {daysUntilPreorderEnds} {daysUntilPreorderEnds === 1 ? 'day' : 'days'}
                  </p>
                  <p className="text-gray-200 text-sm">
                    Pre-order window: February 10 - February 24, 2026 only
                  </p>
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const form = document.querySelector('form');
                    if (form) {
                      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setTimeout(() => {
                        const firstInput = form.querySelector('input') as HTMLInputElement;
                        firstInput?.focus();
                      }, 500);
                    }
                  }}
                  className="mt-6 inline-block bg-white hover:bg-gray-100 text-brand-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  🚀 Pre-order Now - Secure Your Copy
                </a>
              </div>
            )}

            {!isPreorderActive && !isBeforeLaunch && (
              <div className="mt-10 animate-fade-in" style={{animationDelay: '0.7s'}}>
                <div className="inline-block bg-gray-700 text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl">
                  Order Now • $19.95 (Delivery handled personally)
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Preorder Details Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Book Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                About the Book
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                A transformative guide to understanding how God communicates through the fruit of the Spirit in your life.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Book Launch</h3>
                  <p className="text-gray-700 text-lg">
                    <strong className="text-brand-gold">February 10, 2026</strong>
                  </p>
                  {daysUntilLaunch > 0 && (
                    <p className="text-gray-600 mt-2">
                      {daysUntilLaunch} {daysUntilLaunch === 1 ? 'day' : 'days'} until launch
                    </p>
                  )}
                </div>

                <div className="bg-gradient-to-br from-brand-gold/10 to-amber-50 p-6 rounded-2xl shadow-lg border-2 border-brand-gold">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Pre-order Special</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-semibold">Price per copy:</span>
                      <span className="text-2xl font-bold text-brand-gold">$19.95</span>
                    </div>
                    {isPreorderActive && (
                      <div className="pt-4 mt-4 border-t-2 border-brand-gold">
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                          <p className="text-green-700 font-bold text-lg flex items-center mb-2">
                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            FREE Delivery Included
                          </p>
                          <p className="text-green-600 text-sm font-semibold mb-1">
                            Valid: February 10 - February 24, 2026 only
                          </p>
                          <p className="text-gray-600 text-xs mt-2">
                            After this 2-week window, delivery will be handled personally by the buyer.
                          </p>
                        </div>
                      </div>
                    )}
                    {!isPreorderActive && !isBeforeLaunch && (
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-gray-600 text-sm">
                          Pre-order period has ended. Delivery will be handled personally.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Discover</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-brand-gold mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Your unique fruit language</strong> - Understand how God speaks to you through the fruit of the Spirit</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-brand-gold mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Practical biblical wisdom</strong> - Real-world applications for daily spiritual growth</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-brand-gold mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Transformative insights</strong> - From military veteran to powerful minister, Pastor Dee's journey of faith</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-brand-gold mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Actionable steps</strong> - Tools to cultivate and walk in the fruit of the Spirit daily</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-brand-gold">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Who Is This Book For?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2 font-bold">✓</span>
                      <span>Believers seeking deeper understanding of the fruit of the Spirit</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2 font-bold">✓</span>
                      <span>Anyone wanting to grow in their spiritual walk and relationship with God</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2 font-bold">✓</span>
                      <span>Leaders and ministers looking for fresh biblical insights</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-brand-gold mr-2 font-bold">✓</span>
                      <span>Those ready to discover how God uniquely speaks to them</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Preorder Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isPreorderActive ? 'Pre-order Your Copy' : isBeforeLaunch ? 'Reserve Your Copy' : 'Order Your Copy'}
              </h2>
              
              {isPreorderActive && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4 mb-6">
                  <p className="text-green-800 font-semibold text-sm mb-1">
                    🎁 Special Offer: FREE Delivery Included
                  </p>
                  <p className="text-green-700 text-xs">
                    This offer is only valid for 2 weeks starting February 10, 2026. Secure your copy now and save on delivery!
                  </p>
                </div>
              )}

              {!isPreorderActive && !isBeforeLaunch && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 text-sm">
                    The pre-order period with free delivery has ended. You can still order, and delivery will be coordinated personally.
                  </p>
                </div>
              )}

              {isBeforeLaunch && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    <strong>Coming Soon:</strong> Pre-orders will open on February 10, 2026 with free delivery for 2 weeks!
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                {/* Honeypot field - hidden from users, bots will fill this */}
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
                    pointerEvents: 'none'
                  }}
                  aria-hidden="true"
                />
                
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
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

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
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

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
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

                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold text-gray-900 mb-2">
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
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'copy' : 'copies'}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Need more than 20 copies? <a href="/contact" className="text-brand-gold hover:underline">Contact us</a>
                  </p>
                </div>

                {/* Total Amount */}
                <div className={`p-4 rounded-lg border-2 ${isPreorderActive ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-brand-gold">${totalAmount}</span>
                  </div>
                  {isPreorderActive && (
                    <div className="pt-2 border-t border-green-200">
                      <p className="text-green-700 font-bold text-sm flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        FREE Delivery Included (Limited Time)
                      </p>
                      <p className="text-green-600 text-xs mt-1">
                        Save on delivery costs - offer ends February 24, 2026
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isBeforeLaunch}
                  className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg ${
                    isBeforeLaunch 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-brand-gold hover:bg-amber-500 text-brand-black'
                  }`}
                >
                  {isBeforeLaunch 
                    ? 'Pre-orders Open February 10' 
                    : isPreorderActive 
                      ? '🎁 Secure My Pre-order with Free Delivery' 
                      : 'Submit Order'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree that Pastor Dee will contact you with payment and delivery details.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Book Matters Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-6">
              Why This Book Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In a world filled with noise, discover the clear, powerful language God uses to speak directly to your heart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border border-purple-200">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Clarity in Your Walk</h3>
              <p className="text-gray-700 leading-relaxed">
                Stop wondering if you're hearing God correctly. Learn to recognize His voice through the fruit of the Spirit and gain confidence in your spiritual journey.
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl border border-amber-200">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Practical Application</h3>
              <p className="text-gray-700 leading-relaxed">
                This isn't just theory—it's a practical guide you can use every day. Transform your relationship with God through actionable steps and real-world wisdom.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">From Experience</h3>
              <p className="text-gray-700 leading-relaxed">
                Written by Pastor Demetria Bass, a military veteran turned powerful minister, this book comes from real-life transformation and tested faith.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-200">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Timely Message</h3>
              <p className="text-gray-700 leading-relaxed">
                In these times, understanding God's language is more crucial than ever. This book equips you with the tools you need to navigate life with spiritual clarity.
              </p>
            </div>
          </div>

          {isPreorderActive && (
            <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 mb-8">
              <p className="text-green-800 font-bold text-lg mb-2">
                ⚡ Don't Miss Out: Free Delivery Ends in {daysUntilPreorderEnds} {daysUntilPreorderEnds === 1 ? 'Day' : 'Days'}!
              </p>
              <p className="text-green-700 text-sm">
                Secure your copy now and save on delivery costs. This special offer is only available until February 24, 2026.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Promotional CTA Section */}
      <section className="py-20 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-6">
              Ready to Transform Your Spiritual Journey?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Join countless believers who are discovering their fruit language and experiencing deeper connection with God. 
              Your transformation starts with one decision.
            </p>
            {isPreorderActive && (
              <p className="text-lg text-brand-gold font-semibold mb-2">
                ⚡ Limited Time: Free delivery ends in {daysUntilPreorderEnds} {daysUntilPreorderEnds === 1 ? 'day' : 'days'}!
              </p>
            )}
            <p className="text-gray-400 text-sm">
              Pre-order now and receive your copy on launch day, February 10, 2026
            </p>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-brand-gold text-3xl mb-3">📖</div>
              <h3 className="text-white font-bold text-lg mb-2">Biblical Foundation</h3>
              <p className="text-gray-300 text-sm">
                Rooted in Scripture, grounded in truth. Every insight is backed by God's Word.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-brand-gold text-3xl mb-3">💡</div>
              <h3 className="text-white font-bold text-lg mb-2">Practical Wisdom</h3>
              <p className="text-gray-300 text-sm">
                Real-world applications you can use immediately in your daily walk with God.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-brand-gold text-3xl mb-3">🌟</div>
              <h3 className="text-white font-bold text-lg mb-2">Life Transformation</h3>
              <p className="text-gray-300 text-sm">
                Discover how the fruit of the Spirit can revolutionize your faith journey.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const form = document.querySelector('form');
                if (form) {
                  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  // Small delay to ensure smooth scroll completes
                  setTimeout(() => {
                    const firstInput = form.querySelector('input') as HTMLInputElement;
                    firstInput?.focus();
                  }, 500);
                }
              }}
              className="inline-block bg-brand-gold hover:bg-amber-500 text-brand-black font-bold py-5 px-10 rounded-full text-xl transition-all duration-200 transform hover:scale-110 shadow-2xl hover:shadow-3xl"
            >
              {isPreorderActive 
                ? '🎁 Pre-order Now - Get Free Delivery!' 
                : isBeforeLaunch 
                  ? 'Reserve My Copy' 
                  : 'Order Your Copy Now'}
            </a>
            <a
              href="/episodes"
              className="inline-block bg-transparent border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105"
            >
              Watch Episodes
            </a>
          </div>
          
          {isPreorderActive && (
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                🔒 Secure checkout • 📧 Pastor Dee will contact you with payment details • 🚚 Free delivery included
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
