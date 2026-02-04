'use client';

import { useEffect } from 'react';

interface DataLayer {
  push: (args: unknown[]) => void;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer?: DataLayer;
  }
}

export default function GoogleAnalytics() {
  useEffect(() => {
    // Only load in production
    if (process.env.NODE_ENV !== 'production') return;

    const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
    if (!GA_TRACKING_ID) return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer = window.dataLayer || { push: () => {} };
      window.dataLayer.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }, []);

  return null;
}
