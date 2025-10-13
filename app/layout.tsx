import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollAnimations from "./components/ScrollAnimations";

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
    default: "Nothing But The Fruit | Gospel Podcast with Pastor Demetria Bass",
    template: "%s | Nothing But The Fruit"
  },
  description: "Join Pastor Demetria Bass for powerful biblical teaching and spiritual growth. From the battlefield to the pulpit, experience pure gospel truth that transforms lives. Nothing but the fruit of God's Word.",
  keywords: [
    "gospel podcast",
    "christian podcast", 
    "Pastor Demetria Bass",
    "Bass Global Ministries",
    "biblical teaching",
    "spiritual growth",
    "faith podcast",
    "christian ministry",
    "BGM",
    "fruit of the spirit",
    "gospel truth",
    "biblical wisdom",
    "christian discipleship",
    "spiritual transformation"
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
    title: 'Nothing But The Fruit | Gospel Podcast with Pastor Demetria Bass',
    description: 'Join Pastor Demetria Bass for powerful biblical teaching and spiritual growth. From the battlefield to the pulpit, experience pure gospel truth that transforms lives.',
    siteName: 'Nothing But The Fruit',
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
    title: 'Nothing But The Fruit | Gospel Podcast with Pastor Demetria Bass',
    description: 'Join Pastor Demetria Bass for powerful biblical teaching and spiritual growth. Experience pure gospel truth that transforms lives.',
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#F59E0B" />
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Header />
        <main className="pt-[90px]">{children}</main>
        <Footer />
        <ScrollAnimations />
      </body>
    </html>
  );
}