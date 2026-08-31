import { MetadataRoute } from 'next';
import { getAllBooks } from './lib/books';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nothingbutthefruit.com';

  const bookUrls = getAllBooks().map((book) => ({
    url: `${baseUrl}/books/${book.slug}`,
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
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
