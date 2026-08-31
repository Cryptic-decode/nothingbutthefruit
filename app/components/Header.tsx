'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ButtonLink from './ui/ButtonLink';
import Container from './ui/Container';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Episodes', href: '/episodes' },
  { name: 'Books', href: '/books' },
  { name: 'Contact Us', href: '/contact' },
];

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = menuPanelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      menuButton?.focus();
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 z-50">
      <Container className="flex h-[90px] items-center justify-between">
      <nav className="contents" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Nothing But The Fruit</span>
              <div className="flex items-center">
                {/* Brand Logo */}
                <div className="h-12 flex items-center justify-center relative">
                  <Image src="/NBTF44.png" alt="" width={90} height={88} className="h-auto w-auto object-contain" priority />
              </div>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100/50 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => {
            const isActive = isNavActive(pathname, item.href);
            return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
                className={`relative flex h-[90px] items-center text-sm font-bold transition-colors duration-200 after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand-gold after:transition-transform after:duration-200 ${
                  isActive
                    ? 'text-purple-700 after:scale-x-100'
                    : 'text-gray-900 after:scale-x-0 hover:text-purple-700 hover:after:scale-x-100'
                }`}
            >
              {item.name}
            </Link>
            );
          })}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <ButtonLink
            href="https://youtube.com/@nothingbutthefruit?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="group font-semibold"
          >
            <span className="flex items-center">
            Subscribe
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            </span>
          </ButtonLink>
        </div>
      </nav>
      </Container>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div
            aria-hidden="true"
            className="fixed inset-0 z-40 h-dvh w-screen bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile menu panel */}
          <div
            ref={menuPanelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            className="fixed inset-y-0 right-0 z-50 h-dvh w-full max-w-sm border-l border-white/20 bg-white/[0.97] shadow-2xl backdrop-blur-2xl animate-slide-in-right"
          >
            <div className="flex flex-col h-full bg-gradient-to-b from-white/50 to-white/30">
              <h2 id="mobile-navigation-title" className="sr-only">Main navigation</h2>
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/30 bg-white/50 backdrop-blur-xl">
                <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Nothing But The Fruit</span>
                  <div className="flex items-center">
                    {/* Brand Logo - Mobile */}
                    <div className="h-10 flex items-center justify-center relative">
                      <Image src="/NothingButTheFruitUpgrade.png" alt="" width={160} height={40} className="h-auto w-auto object-contain" />
                  </div>
                </div>
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100/50 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
              
              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto bg-white/95 px-6 py-6">
                <nav className="space-y-2" aria-label="Mobile">
                  {navigation.map((item) => {
                    const isActive = isNavActive(pathname, item.href);
                    return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
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
                  <ButtonLink
                    href="https://youtube.com/@nothingbutthefruit?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                  <span className="flex items-center justify-center">
                    Subscribe on YouTube
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </span>
                  </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
