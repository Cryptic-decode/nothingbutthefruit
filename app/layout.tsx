import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollAnimations from "./components/ScrollAnimations";
import GoogleAnalytics from "./components/GoogleAnalytics";

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
    "christian podcast 2024"
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || 'your-google-verification-code',
  },
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
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Nothing But The Fruit",
              "alternateName": "Bass Global Ministries",
              "url": "https://nothingbutthefruit.com",
              "logo": "https://nothingbutthefruit.com/icon.png",
              "description": "Gospel podcast with Pastor Demetria Bass providing biblical teaching and spiritual growth",
              "founder": {
                "@type": "Person",
                "name": "Pastor Demetria Bass"
              },
              "sameAs": [
                "https://www.youtube.com/@nothingbutthefruit",
                "https://www.facebook.com/nothingbutthefruit"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://nothingbutthefruit.com/contact"
              }
            })
          }}
        />

        {/* Podcast Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PodcastSeries",
              "name": "Nothing But The Fruit",
              "description": "Experience transformative biblical teaching with Pastor Demetria Bass. From military veteran to powerful minister, discover pure gospel truth that changes lives.",
              "author": {
                "@type": "Person",
                "name": "Pastor Demetria Bass",
                "description": "Military veteran turned powerful minister, providing biblical teaching and spiritual growth"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Bass Global Ministries"
              },
              "image": "https://nothingbutthefruit.com/icon.png",
              "url": "https://nothingbutthefruit.com",
              "webFeed": "https://nothingbutthefruit.com/episodes",
              "sameAs": [
                "https://youtube.com/@nothingbutthefruit",
                "https://facebook.com/nothingbutthefruit"
              ],
              "genre": ["Religion & Spirituality", "Christianity", "Biblical Teaching"],
              "keywords": "christian podcast, gospel teaching, biblical teaching, Pastor Demetria Bass, spiritual growth, faith podcast"
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Header />
        <main className="pt-[90px]">{children}</main>
        <Footer />
        <ScrollAnimations />
        <GoogleAnalytics />
      </body>
    </html>
  );
}