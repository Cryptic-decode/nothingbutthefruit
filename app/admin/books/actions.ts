'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/app/lib/supabase/auth';
import { createClient } from '@/app/lib/supabase/server';
import type {
  BookProductType,
  BookPublicationStatus,
  Database,
} from '@/app/lib/supabase/database.types';

type BookUpdate = Database['public']['Tables']['books']['Update'];

export interface SaveBookResult {
  id?: string;
  message: string;
  status: 'error' | 'success';
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function readText(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

function readStoragePath(formData: FormData, field: string): string | null {
  const value = readText(formData, field);
  if (!value) return null;
  if (value.length > 500 || value.startsWith('/') || value.includes('..')) return null;
  return value;
}

function parsePriceInCents(value: string): number | null {
  if (!value) return null;
  if (!/^\d+(?:\.\d{1,2})?$/.test(value)) return Number.NaN;
  const cents = Math.round(Number(value) * 100);
  return Number.isSafeInteger(cents) ? cents : Number.NaN;
}

function revalidateBookRoutes(id?: string) {
  revalidatePath('/admin');
  revalidatePath('/admin/books');
  if (id) revalidatePath(`/admin/books/${id}`);
  revalidatePath('/books');
}

export async function saveBook(formData: FormData): Promise<SaveBookResult> {
  const admin = await requireAdmin();
  const supabase = await createClient();
  const id = readText(formData, 'id');
  const title = readText(formData, 'title');
  const slug = readText(formData, 'slug').toLowerCase();
  const description = readText(formData, 'description');
  const coverAlt = readText(formData, 'cover_alt');
  const coverPath = readStoragePath(formData, 'cover_path');
  const requestedEbookPath = readStoragePath(formData, 'ebook_path');
  const priceCents = parsePriceInCents(readText(formData, 'price'));
  const productType = readText(formData, 'product_type') as BookProductType;
  const status = readText(formData, 'status') as BookPublicationStatus;

  if (id && !uuidPattern.test(id)) {
    return { status: 'error', message: 'This book record is invalid.' };
  }

  if (!title || title.length > 180) {
    return { status: 'error', message: 'Enter a title of 180 characters or fewer.' };
  }

  if (!slugPattern.test(slug)) {
    return {
      status: 'error',
      message: 'Use lowercase letters, numbers, and hyphens only for the URL slug.',
    };
  }

  if (!['physical', 'ebook'].includes(productType)) {
    return { status: 'error', message: 'Select a valid book format.' };
  }

  if (!['draft', 'published'].includes(status)) {
    return { status: 'error', message: 'Select draft or published status.' };
  }

  if (Number.isNaN(priceCents) || (priceCents !== null && priceCents < 0)) {
    return { status: 'error', message: 'Enter a valid price with no more than two decimal places.' };
  }

  if (description.length > 5000 || coverAlt.length > 180) {
    return { status: 'error', message: 'The description or cover description is too long.' };
  }

  const ebookPath = productType === 'ebook' ? requestedEbookPath : null;

  if (status === 'published') {
    const missing = [
      !description && 'description',
      (!priceCents || priceCents <= 0) && 'price',
      !coverPath && 'cover image',
      productType === 'ebook' && !ebookPath && 'eBook file',
    ].filter(Boolean);

    if (missing.length > 0) {
      return {
        status: 'error',
        message: `Add the ${missing.join(', ')} before publishing.`,
      };
    }
  }

  let existingPublishedAt: string | null = null;
  if (id) {
    const { data: existing, error: existingError } = await supabase
      .from('books')
      .select('published_at')
      .eq('id', id)
      .single();

    if (existingError || !existing) {
      return { status: 'error', message: 'We could not find this book.' };
    }
    existingPublishedAt = existing.published_at;
  }

  const values: BookUpdate = {
    product_type: productType,
    status,
    title,
    slug,
    description,
    price_cents: priceCents,
    cover_path: coverPath,
    cover_alt: coverAlt,
    ebook_path: ebookPath,
    published_at:
      status === 'published' ? existingPublishedAt ?? new Date().toISOString() : null,
  };

  const result = id
    ? await supabase.from('books').update(values).eq('id', id).select('id').single()
    : await supabase
        .from('books')
        .insert({ ...values, title, slug, created_by: admin.userId })
        .select('id')
        .single();

  if (result.error) {
    return {
      status: 'error',
      message:
        result.error.code === '23505'
          ? 'That URL slug is already in use. Choose a different one.'
          : 'We could not save the book. Please review the details and try again.',
    };
  }

  revalidateBookRoutes(result.data.id);
  return {
    status: 'success',
    id: result.data.id,
    message: status === 'published' ? 'Book published.' : 'Draft saved.',
  };
}

export async function archiveBook(id: string): Promise<void> {
  await requireAdmin();
  if (!uuidPattern.test(id)) redirect('/admin/books?error=invalid');

  const supabase = await createClient();
  const { error } = await supabase
    .from('books')
    .update({ status: 'archived', published_at: null })
    .eq('id', id);

  if (error) redirect(`/admin/books/${id}?error=archive`);
  revalidateBookRoutes(id);
  redirect('/admin/books?archived=1');
}

export async function restoreBook(id: string): Promise<void> {
  await requireAdmin();
  if (!uuidPattern.test(id)) redirect('/admin/books?error=invalid');

  const supabase = await createClient();
  const { error } = await supabase
    .from('books')
    .update({ status: 'draft', published_at: null })
    .eq('id', id);

  if (error) redirect(`/admin/books/${id}?error=restore`);
  revalidateBookRoutes(id);
  redirect(`/admin/books/${id}?restored=1`);
}
