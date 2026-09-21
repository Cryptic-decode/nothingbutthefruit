import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';
import type { Database } from './supabase/database.types';
import { getSupabaseEnvironment } from './supabase/env';

export interface PublishedEbook {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  coverUrl: string;
  coverAlt: string;
  publishedAt: string | null;
}

interface EbookCatalogResult {
  books: PublishedEbook[];
  error: boolean;
}

const ebookColumns =
  'id, slug, title, description, price_cents, cover_path, cover_alt, published_at';

function createPublicClient() {
  const { supabaseUrl, supabasePublishableKey } = getSupabaseEnvironment();

  return createClient<Database>(supabaseUrl, supabasePublishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function toPublishedEbook(
  supabase: ReturnType<typeof createPublicClient>,
  book: {
    id: string;
    slug: string;
    title: string;
    description: string;
    price_cents: number | null;
    cover_path: string | null;
    cover_alt: string;
    published_at: string | null;
  }
): PublishedEbook | null {
  if (book.price_cents === null || !book.cover_path) return null;

  const { data } = supabase.storage.from('book-covers').getPublicUrl(book.cover_path);

  return {
    id: book.id,
    slug: book.slug,
    title: book.title,
    description: book.description,
    price: book.price_cents / 100,
    coverUrl: data.publicUrl,
    coverAlt: book.cover_alt || `Cover of ${book.title}`,
    publishedAt: book.published_at,
  };
}

export const getPublishedEbooks = cache(async (): Promise<EbookCatalogResult> => {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('books')
      .select(ebookColumns)
      .eq('product_type', 'ebook')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) return { books: [], error: true };

    return {
      books: (data ?? [])
        .map((book) => toPublishedEbook(supabase, book))
        .filter((book): book is PublishedEbook => book !== null),
      error: false,
    };
  } catch {
    return { books: [], error: true };
  }
});

export const getPublishedEbookBySlug = cache(
  async (slug: string): Promise<PublishedEbook | null> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('books')
      .select(ebookColumns)
      .eq('product_type', 'ebook')
      .eq('status', 'published')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw new Error('Unable to load the eBook catalog.');
    return data ? toPublishedEbook(supabase, data) : null;
  }
);
