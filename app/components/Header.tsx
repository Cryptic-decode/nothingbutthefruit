'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Episodes', href: '/episodes' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Nothing But The Fruit</span>
              <div className="flex items-center">
                {/* Brand Logo */}
                <div className="h-12 flex items-center justify-center relative">
                  <Image src="/NothingButTheFruitUpgrade.png" alt="Nothing But The Fruit" width={200} height={48} className="object-contain" priority />
                </div>
              </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100/50 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-all duration-300 ${
                  isActive 
                    ? 'text-purple-700 text-base font-extrabold' 
                    : 'text-gray-900 text-sm font-bold hover:text-purple-700'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="https://youtube.com/@nothingbutthefruit?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-brand-gold hover:bg-amber-500 text-brand-black font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Subscribe
            {/* <svg className="inline ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg> */}
          </Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fade-in h-screen w-screen" onClick={() => setMobileMenuOpen(false)}></div>
          
          {/* Mobile menu panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white/[0.97] backdrop-blur-2xl shadow-2xl animate-slide-in-right border-l border-white/20 h-screen">
            <div className="flex flex-col h-full bg-gradient-to-b from-white/50 to-white/30">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/30 bg-white/50 backdrop-blur-xl">
                <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                  <span className="sr-only">Nothing But The Fruit</span>
                  <div className="flex items-center">
                    {/* Brand Logo - Mobile */}
                    <div className="h-10 flex items-center justify-center relative">
                      <Image src="/NothingButTheFruitUpgrade.png" alt="Nothing But The Fruit" width={160} height={40} className="object-contain" />
                    </div>
                  </div>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100/50 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 px-6 py-6 bg-white/95 h-[100vh]">
                <nav className="space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block rounded-lg px-4 py-3 text-base font-semibold transition-all duration-200 ${
                          isActive 
                            ? 'bg-brand-gold text-brand-black shadow-sm' 
                            : 'text-gray-900 hover:bg-white/80 hover:text-purple-700'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              
              {/* Subscribe Button */}
              <div className="p-6 border-t border-gray-200/30 bg-white/50 backdrop-blur-xl">
                <Link
                  href="https://youtube.com/@nothingbutthefruit?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-brand-gold hover:bg-amber-500 text-brand-black font-semibold py-3 px-6 rounded-full text-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Subscribe on YouTube
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}