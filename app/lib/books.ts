export type BookDisplayVariant = 'rendered' | 'constructed' | 'landscape';

export interface Book {
  slug: string;
  title: string;
  price: number;
  savings?: string;
  regularValue?: number;
  description: string;
  highlights: string[];
  coverImage: string;
  mockupImage?: string;
  coverAspect: 'portrait' | 'landscape';
  series: 'wyfl' | 'orchard';
  relatedSlugs: string[];
  isBundle: boolean;
  bundleIncludes?: string[];
}

export function getBookDisplayImage(book: Book): string {
  return book.mockupImage ?? book.coverImage;
}

export function getBookDisplayVariant(book: Book): BookDisplayVariant {
  if (book.mockupImage) return 'rendered';
  if (book.coverAspect === 'landscape') return 'landscape';
  return 'constructed';
}

const books: Book[] = [
  {
    slug: 'whats-your-fruit-language',
    title: "What's Your Fruit Language?",
    price: 19.95,
    description:
      'Discover how God speaks through the fruit of the Spirit in your life. A clear, Scripture-rooted guide with practical steps you can live out every day.',
    highlights: [
      'Scripture-rooted teaching',
      'Practical daily steps',
      'Understand your fruit language',
    ],
    coverImage: "/book-covers/What'sYourFruitLanguage.jpg",
    mockupImage: "/book-covers/What'sYourFruitLanguage(Mockup).png",
    coverAspect: 'portrait',
    series: 'wyfl',
    relatedSlugs: ['whats-your-fruit-language-devotional', 'fruit-growth-bundle'],
    isBundle: false,
  },
  {
    slug: 'whats-your-fruit-language-devotional',
    title: "What's Your Fruit Language? 90-Day Devotional Companion",
    price: 24.95,
    description:
      'Go deeper with 90 days of devotion, reflection, and prayer. Cultivate spiritual growth and live out God\u2019s fruit one day at a time.',
    highlights: [
      '90-day devotional',
      'Reflection and prayer',
      'Daily spiritual growth',
    ],
    coverImage: "/book-covers/What'sYourFruitLanguage_Devotional.png",
    mockupImage: "/book-covers/What'sYourFruitLanguage_Devotional(Mockup).png",
    coverAspect: 'portrait',
    series: 'wyfl',
    relatedSlugs: ['whats-your-fruit-language', 'fruit-growth-bundle'],
    isBundle: false,
  },
  {
    slug: 'fruit-growth-bundle',
    title: 'Fruit Growth Bundle Special',
    price: 35.00,
    savings: 'Save $9.90',
    regularValue: 44.90,
    description:
      'The main book and 90-day devotional together. A powerful pair for personal growth, small groups, discipleship, or as a gift.',
    highlights: [
      'Includes main book + devotional',
      'Save $9.90',
      'Perfect for gifts and small groups',
    ],
    coverImage: "/book-covers/What'sYourFruitLanguage_BundlePackage(Improved).png",
    mockupImage: "/book-covers/What'sYourFruitLanguage_BundlePackage(Improved).png",
    coverAspect: 'landscape',
    series: 'wyfl',
    relatedSlugs: ['whats-your-fruit-language', 'whats-your-fruit-language-devotional'],
    isBundle: true,
    bundleIncludes: ['whats-your-fruit-language', 'whats-your-fruit-language-devotional'],
  },
  {
    slug: 'through-the-orchard-everyday-life',
    title:
      'Through the Orchard \u2013 Cultivating the Fruit of the Spirit in Everyday Life',
    price: 24.95,
    description:
      'Walk through the orchard of faith with practical teaching on living out love, joy, peace, and every fruit of the Spirit in real life.',
    highlights: [
      'Everyday application',
      'Fruit of the Spirit teaching',
      'Practical faith living',
    ],
    coverImage: "/book-covers/ThroughTheOrchard_CultivatingTheFruitInEveryDayLife.jpg",
    mockupImage: "/book-covers/ThroughTheOrchard_CultivatingTheFruitInEveryDayLife(Mockup).png",
    coverAspect: 'portrait',
    series: 'orchard',
    relatedSlugs: ['through-the-orchard-soil-to-harvest'],
    isBundle: false,
  },
  {
    slug: 'through-the-orchard-soil-to-harvest',
    title: 'Through the Orchard \u2013 From Soil to Harvest',
    price: 9.95,
    description:
      'A 6-chapter journey from the soil of the heart to the harvest. Growth, transformation, and discipleship, including a 30-day orchard journey.',
    highlights: [
      '6-chapter journey',
      '30-day orchard journey',
      'Growth and discipleship',
    ],
    coverImage: "/book-covers/ThroughTheOrchard_FromSoilToHaverst.jpeg",
    mockupImage: '/book-covers/ThroughTheOrchardBookMockup.png',
    coverAspect: 'portrait',
    series: 'orchard',
    relatedSlugs: ['through-the-orchard-everyday-life'],
    isBundle: false,
  },
];

export function getAllBooks(): Book[] {
  return books;
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getBooksBySeries(series: 'wyfl' | 'orchard'): Book[] {
  return books.filter((b) => b.series === series);
}

export function getRelatedBooks(slug: string): Book[] {
  const book = getBookBySlug(slug);
  if (!book) return [];
  return book.relatedSlugs
    .map((s) => getBookBySlug(s))
    .filter((b): b is Book => b !== undefined);
}
