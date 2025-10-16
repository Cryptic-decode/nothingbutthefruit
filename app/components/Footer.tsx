import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              {/* Brand Logo - Footer */}
              <div className="flex items-center">
                <div className="h-12 flex items-center justify-center relative">
                  <Image src="/NBTF44.png" alt="Nothing But The Fruit" width={90} height={28} className="object-contain" />
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Pure Gospel. Real Growth.
            </p>
            <p className="text-gray-400 mt-4 max-w-lg">
              Join Pastor Demetria Bass for powerful biblical teaching that transforms lives. From the battlefield to the pulpit, experience nothing but the fruit of God's Word.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/episodes" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                  Episodes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <a href="https://www.bassglobalministries.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                  Bass Global Ministries
                </a>
              </li>
            </ul>
          </div>

          {/* Podcast Topics */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Topics</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300">Biblical Teaching</span>
              </li>
              <li>
                <span className="text-gray-300">Spiritual Growth</span>
              </li>
              <li>
                <span className="text-gray-300">Faith & Resilience</span>
              </li>
              <li>
                <span className="text-gray-300">Kingdom Living</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info & Social */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-brand-gold mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href="mailto:nbtfruit@gmail.com" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                    nbtfruit@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-brand-gold mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <a href="https://youtube.com/@nothingbutthefruit" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-gold transition-colors duration-200">
                    @nothingbutthefruit
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://youtube.com/@nothingbutthefruit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="https://facebook.com/nothingbutthefruit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Nothing But The Fruit. All rights reserved. | A ministry of <a href="https://www.bassglobalministries.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Bass Global Ministries</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
