import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Nothing But The Fruit Podcast',
  description: 'Get in touch with Pastor Demetria Bass and the Nothing But The Fruit team. Send prayer requests, questions, or connect with our ministry. We\'d love to hear from you.',
  keywords: [
    'contact Pastor Demetria Bass',
    'prayer request',
    'christian ministry contact',
    'Bass Global Ministries contact',
    'Nothing But The Fruit contact',
    'gospel ministry support',
    'christian podcast contact',
    'spiritual guidance contact'
  ],
  openGraph: {
    title: 'Contact Us | Nothing But The Fruit Podcast',
    description: 'Get in touch with Pastor Demetria Bass and the Nothing But The Fruit team. Send prayer requests, questions, or connect with our ministry.',
    url: 'https://nothingbutthefruit.com/contact',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Nothing But The Fruit Podcast',
      },
    ],
  },
  alternates: {
    canonical: 'https://nothingbutthefruit.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
