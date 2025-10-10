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
            <div className="flex items-center space-x-3">
              {/* Tree Branch Icon */}
              <div className="w-11 h-11 flex items-center justify-center relative">
                <Image src="/tree-branch.png" alt="Tree Branch" width={44} height={44} className="object-contain" priority />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-brand-black">Nothing But The Fruit</h1>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
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
            <svg className="inline ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Nothing But The Fruit</span>
                <div className="flex items-center space-x-2">
                  {/* Tree Branch Icon - Mobile */}
                  <div className="w-9 h-9 flex items-center justify-center relative">
                    <Image src="/tree-branch.png" alt="Tree Branch" width={36} height={36} className="object-contain" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-brand-black">Nothing But The Fruit</h1>
                  </div>
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                    <Link
                      key={item.name}
                      href={item.href}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 transition-colors duration-200 ${
                          isActive 
                            ? 'bg-brand-gold text-brand-black' 
                            : 'text-gray-900 hover:bg-gray-50'
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    );
                  })}
                </div>
                <div className="py-6">
                  <Link
                    href="https://youtube.com/@nothingbutthefruit?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-brand-gold hover:bg-amber-500 text-brand-black font-semibold py-3 px-6 rounded-full text-center transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Subscribe
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 
