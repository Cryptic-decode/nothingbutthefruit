import { MetadataRoute } from 'next';
import { getAllBooks } from './lib/books';
import { getPublishedEbooks } from './lib/ebooks';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nothingbutthefruit.com';
  const physicalBooks = getAllBooks();
  const { books: ebooks } = await getPublishedEbooks();
  const physicalSlugs = new Set(physicalBooks.map((book) => book.slug));

  const bookUrls = physicalBooks.map((book) => ({
    url: `${baseUrl}/books/${book.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  const ebookUrls = ebooks
    .filter((book) => !physicalSlugs.has(book.slug))
    .map((book) => ({
      url: `${baseUrl}/books/${book.slug}`,
      lastModified: book.publishedAt ?? undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/episodes`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/books`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...bookUrls,
    ...ebookUrls,
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
