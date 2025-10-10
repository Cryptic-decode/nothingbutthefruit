'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    messageType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add actual form submission logic later
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-20 w-40 h-40 bg-brand-gold opacity-10 rounded-2xl transform rotate-12 blur-lg"></div>
          <div className="absolute top-60 right-10 w-56 h-56 bg-brand-gold opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-40 left-1/3 w-32 h-32 bg-white opacity-10 rounded-xl transform -rotate-45 blur-md"></div>
          <div className="absolute top-32 right-1/3 w-20 h-20 bg-purple-400 opacity-15 rounded-full blur-sm"></div>
          
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid-contact" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#FFE500" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-contact)"/>
          </svg>

          {/* Animated circuit-like lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 600">
            <path 
              d="M100,100 Q200,50 300,100 T500,100 L600,200 Q650,250 600,300 T400,300 L200,400" 
              stroke="#FFE500" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="5,5"
              className="animate-pulse"
            />
            <path 
              d="M700,150 Q600,100 500,150 T300,150 L200,250 Q150,300 200,350 T400,350 L600,450" 
              stroke="#A855F7" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="3,7"
              className="animate-pulse"
              style={{animationDelay: '1.5s'}}
            />
          </svg>

          {/* Message/communication icons */}
          <div className="absolute top-40 left-1/4 opacity-20">
            <svg className="w-14 h-14 text-brand-gold animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="absolute bottom-40 right-1/4 opacity-15">
            <svg className="w-16 h-16 text-purple-300 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{animationDelay: '2s'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/10 to-black/30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-on-scroll animate-slideInUp">
              Get in{" "}
              <span className="text-brand-black bg-brand-gold px-3 py-1 rounded-lg inline-block transform -rotate-1 shadow-xl">
                Touch
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-200 max-w-3xl mx-auto sm:text-2xl sm:leading-9 animate-on-scroll animate-slideInUp" style={{animationDelay: '0.2s'}}>
              Share your testimony, request prayer, or connect with us.
            </p>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto animate-on-scroll animate-slideInUp" style={{animationDelay: '0.4s'}}>
              We'd love to hear from you and be part of your faith journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-on-scroll animate-slideInLeft">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Message Type */}
                <div>
                  <label htmlFor="messageType" className="block text-sm font-semibold text-gray-900 mb-2">
                    Message Type *
                  </label>
                  <select
                    id="messageType"
                    name="messageType"
                    required
                    value={formData.messageType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select message type</option>
                    <option value="Prayer Request">Prayer Request</option>
                    <option value="Testimony">Testimony</option>
                    <option value="Question">Question About an Episode</option>
                    <option value="Guest Suggestion">Guest/Topic Suggestion</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-colors duration-200"
                    placeholder="Share your message with us..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-brand-gold hover:bg-yellow-400 text-brand-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="animate-on-scroll animate-slideInRight" style={{animationDelay: '0.2s'}}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Other ways to reach us
              </h2>
              
              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start animate-on-scroll animate-slideInUp">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-yellow-300 rounded-full flex items-center justify-center mr-4 flex-shrink-0 animate-float">
                    <svg className="w-6 h-6 text-brand-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 mb-2">For prayer requests, testimonies, and inquiries</p>
                    <a 
                      href="mailto:info@nothingbutthefruit.com" 
                      className="text-brand-black hover:text-gray-700 font-semibold transition-colors duration-200"
                    >
                      info@nothingbutthefruit.com
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start animate-on-scroll animate-slideInUp" style={{animationDelay: '0.1s'}}>
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-yellow-300 rounded-full flex items-center justify-center mr-4 flex-shrink-0 animate-float" style={{animationDelay: '0.5s'}}>
                    <svg className="w-6 h-6 text-brand-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.948 16.011c-.664 0-1.201-.538-1.201-1.201s.537-1.2 1.201-1.2c.664 0 1.201.537 1.201 1.2s-.537 1.201-1.201 1.201zm6.105 0c-.664 0-1.201-.538-1.201-1.201s.537-1.2 1.201-1.2c.664 0 1.201.537 1.201 1.2s-.537 1.201-1.201 1.201z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Instagram</h3>
                    <p className="text-gray-600 mb-2">Follow for daily encouragement and episode updates</p>
                    <a 
                      href="https://instagram.com/nothingbutthefruit" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-black hover:text-gray-700 font-semibold transition-colors duration-200"
                    >
                      @nothingbutthefruit
                    </a>
                  </div>
                </div>

                {/* YouTube */}
                <div className="flex items-start animate-on-scroll animate-slideInUp" style={{animationDelay: '0.2s'}}>
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-yellow-300 rounded-full flex items-center justify-center mr-4 flex-shrink-0 animate-float" style={{animationDelay: '1s'}}>
                    <svg className="w-6 h-6 text-brand-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">YouTube</h3>
                    <p className="text-gray-600 mb-2">Watch full episodes and subscribe</p>
                    <a 
                      href="https://youtube.com/@nothingbutthefruit" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-black hover:text-gray-700 font-semibold transition-colors duration-200"
                    >
                      @nothingbutthefruit
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-12 p-6 bg-gray-50 rounded-2xl animate-on-scroll animate-scaleIn" style={{animationDelay: '0.4s'}}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🙏 We're Here For You</h3>
                <p className="text-gray-600">
                  We read every message and prayer request. You're not alone in your faith journey — we're praying with you and for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll animate-slideInUp">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:bg-white transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll animate-slideInLeft">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Where can I watch episodes?</h3>
              <p className="text-gray-600">
                Full episodes are available on our YouTube channel @nothingbutthefruit. Subscribe to get notified when new episodes drop!
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:bg-white transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll animate-slideInRight" style={{animationDelay: '0.1s'}}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Will you share my prayer request?</h3>
              <p className="text-gray-600">
                All prayer requests are kept confidential. We only share testimonies with your explicit permission.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:bg-white transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll animate-slideInLeft" style={{animationDelay: '0.2s'}}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Can I suggest a topic?</h3>
              <p className="text-gray-600">
                Absolutely! We love hearing from our listeners. Use the "Guest/Topic Suggestion" option in the contact form above.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:bg-white transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll animate-slideInRight" style={{animationDelay: '0.3s'}}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">How often are new episodes released?</h3>
              <p className="text-gray-600">
                We release new episodes weekly. Follow us on social media for episode announcements and bonus content!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl animate-on-scroll animate-slideInUp">
            Join the Community
          </h2>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto animate-on-scroll animate-slideInUp" style={{animationDelay: '0.2s'}}>
            Subscribe to Nothing But The Fruit and grow deeper in your faith journey.
          </p>
          <div className="mt-10 animate-on-scroll animate-scaleIn" style={{animationDelay: '0.4s'}}>
            <a 
              href="https://youtube.com/@nothingbutthefruit?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-gold hover:bg-yellow-400 text-brand-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              📺 Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 