import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollAnimations from "./components/ScrollAnimations";
import GoogleAnalytics from "./components/GoogleAnalytics";
import JsonLd from "./components/JsonLd";
import { entityIds, siteConfig } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nothing But The Fruit Podcast | Biblical Teaching with Pastor Demetria Bass",
    template: "%s | Nothing But The Fruit Podcast"
  },
  description: "Experience transformative biblical teaching with Pastor Demetria Bass. From military veteran to powerful minister, discover pure gospel truth that changes lives. New episodes weekly on YouTube.",
  keywords: [
    "christian podcast",
    "gospel teaching podcast",
    "Pastor Demetria Bass",
    "biblical teaching podcast",
    "christian ministry podcast",
    "military veteran minister",
    "Bass Global Ministries",
    "spiritual growth podcast",
    "Nothing But The Fruit",
    "christian women podcast",
    "gospel truth podcast",
    "biblical wisdom podcast",
    "christian discipleship podcast",
    "spiritual transformation podcast",
    "faith podcast",
    "christian faith podcast"
  ],
  authors: [{ name: "Pastor Demetria Bass" }],
  creator: "Nothing But The Fruit",
  publisher: "Bass Global Ministries",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nothingbutthefruit.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nothingbutthefruit.com',
    title: 'Nothing But The Fruit Podcast | Biblical Teaching with Pastor Demetria Bass',
    description: 'Experience transformative biblical teaching with Pastor Demetria Bass. From military veteran to powerful minister, discover pure gospel truth that changes lives.',
    siteName: 'Nothing But The Fruit Podcast',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nothing But The Fruit - Gospel Podcast with Pastor Demetria Bass',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nothing But The Fruit Podcast | Biblical Teaching with Pastor Demetria Bass',
    description: 'Experience transformative biblical teaching with Pastor Demetria Bass. From military veteran to powerful minister, discover pure gospel truth that changes lives.',
    images: ['/og-image.jpg'],
    creator: '@nothingbutthefruit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': entityIds.organization,
      name: siteConfig.name,
      alternateName: siteConfig.organizationName,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.png`,
      description: siteConfig.description,
      founder: { '@id': entityIds.author },
      sameAs: [siteConfig.youtubeUrl, siteConfig.facebookUrl],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        url: `${siteConfig.url}/contact`,
      },
    },
    {
      '@type': 'Person',
      '@id': entityIds.author,
      name: siteConfig.authorName,
      url: `${siteConfig.url}/about`,
      image: `${siteConfig.url}/PastorDeeNew.png`,
      jobTitle: 'Executive Pastor',
      worksFor: { '@id': entityIds.organization },
    },
    {
      '@type': 'WebSite',
      '@id': entityIds.website,
      name: siteConfig.title,
      url: siteConfig.url,
      description: siteConfig.description,
      publisher: { '@id': entityIds.organization },
      inLanguage: 'en-US',
    },
    {
      '@type': 'PodcastSeries',
      '@id': entityIds.podcast,
      name: siteConfig.name,
      description: siteConfig.description,
      author: { '@id': entityIds.author },
      publisher: { '@id': entityIds.organization },
      image: `${siteConfig.url}/icon.png`,
      url: `${siteConfig.url}/episodes`,
      sameAs: [siteConfig.youtubeUrl, siteConfig.facebookUrl],
      genre: ['Religion & Spirituality', 'Christianity', 'Biblical Teaching'],
      inLanguage: 'en-US',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#F59E0B" />
        <JsonLd data={siteStructuredData} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-brand-gold px-5 py-3 font-bold text-brand-black shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="pt-[90px] focus:outline-none">{children}</main>
        <Footer />
        <ScrollAnimations />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
