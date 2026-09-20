'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import SelectField, { type SelectValue } from '@/app/components/ui/SelectField';
import { createClient } from '@/app/lib/supabase/client';
import type {
  BookProductType,
  BookPublicationStatus,
  Database,
} from '@/app/lib/supabase/database.types';
import { saveBook } from './actions';

type BookRow = Database['public']['Tables']['books']['Row'];

interface BookFormProps {
  book?: BookRow;
}

const productOptions = [
  { value: 'ebook', label: 'eBook' },
  { value: 'physical', label: 'Physical book' },
] as const;

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
] as const;

const fieldClassName =
  'min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-gray-950 shadow-sm transition-colors placeholder:text-gray-400 hover:border-stone-400 focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-200';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function safeFileName(value: string): string {
  const extensionIndex = value.lastIndexOf('.');
  const extension = extensionIndex >= 0 ? value.slice(extensionIndex).toLowerCase() : '';
  const base = extensionIndex >= 0 ? value.slice(0, extensionIndex) : value;
  const safeBase = slugify(base).slice(0, 80) || 'file';
  return `${safeBase}${extension}`;
}

function fileNameFromPath(path: string | null): string | null {
  return path?.split('/').pop() ?? null;
}

export default function BookForm({ book }: BookFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(book?.title ?? '');
  const [slug, setSlug] = useState(book?.slug ?? '');
  const [slugEdited, setSlugEdited] = useState(Boolean(book));
  const [productType, setProductType] = useState<BookProductType>(
    book?.product_type ?? 'ebook'
  );
  const [status, setStatus] = useState<Exclude<BookPublicationStatus, 'archived'>>(
    book?.status === 'published' ? 'published' : 'draft'
  );
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function uploadFile(
    bucket: 'book-covers' | 'ebooks',
    file: File,
    folder: string
  ): Promise<string> {
    const supabase = createClient();
    const path = `${folder}/${Date.now()}-${safeFileName(file.name)}`;
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      contentType: file.type || undefined,
      upsert: false,
    });

    if (error) throw new Error(error.message);
    return data.path;
  }

  async function removeFile(bucket: 'book-covers' | 'ebooks', path: string | null) {
    if (!path) return;
    const supabase = createClient();
    await supabase.storage.from(bucket).remove([path]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const coverFile = formData.get('cover_file');
    const ebookFile = formData.get('ebook_file');
    const uploaded: Array<{ bucket: 'book-covers' | 'ebooks'; path: string }> = [];
    const folder = book?.id ?? crypto.randomUUID();

    try {
      if (coverFile instanceof File && coverFile.size > 0) {
        if (coverFile.size > 10 * 1024 * 1024) {
          throw new Error('The cover image must be 10 MB or smaller.');
        }
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(coverFile.type)) {
          throw new Error('Use a JPG, PNG, or WebP cover image.');
        }
        const path = await uploadFile('book-covers', coverFile, folder);
        uploaded.push({ bucket: 'book-covers', path });
        formData.set('cover_path', path);
      }

      if (productType === 'ebook' && ebookFile instanceof File && ebookFile.size > 0) {
        if (ebookFile.size > 100 * 1024 * 1024) {
          throw new Error('The eBook file must be 100 MB or smaller.');
        }
        const allowedEbookTypes = ['application/pdf', 'application/epub+zip'];
        const hasAllowedExtension = /\.(pdf|epub)$/i.test(ebookFile.name);
        if (!allowedEbookTypes.includes(ebookFile.type) && !hasAllowedExtension) {
          throw new Error('Use a PDF or EPUB eBook file.');
        }
        const path = await uploadFile('ebooks', ebookFile, folder);
        uploaded.push({ bucket: 'ebooks', path });
        formData.set('ebook_path', path);
      }

      formData.set('product_type', productType);
      formData.set('status', status);
      if (productType === 'physical') formData.set('ebook_path', '');

      const result = await saveBook(formData);

      if (result.status === 'error' || !result.id) {
        await Promise.all(uploaded.map((file) => removeFile(file.bucket, file.path)));
        setMessage(result.message);
        return;
      }

      const newCoverPath = formData.get('cover_path');
      const newEbookPath = formData.get('ebook_path');
      const cleanup: Array<Promise<void>> = [];

      if (
        book?.cover_path &&
        typeof newCoverPath === 'string' &&
        newCoverPath !== book.cover_path
      ) {
        cleanup.push(removeFile('book-covers', book.cover_path));
      }

      if (
        book?.ebook_path &&
        (productType === 'physical' ||
          (typeof newEbookPath === 'string' && newEbookPath !== book.ebook_path))
      ) {
        cleanup.push(removeFile('ebooks', book.ebook_path));
      }

      await Promise.all(cleanup);
      router.push(`/admin/books/${result.id}?saved=1`);
      router.refresh();
    } catch (error) {
      await Promise.all(uploaded.map((file) => removeFile(file.bucket, file.path)));
      setMessage(error instanceof Error ? error.message : 'We could not save the book.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleProductChange(value: SelectValue | null) {
    if (value === 'ebook' || value === 'physical') setProductType(value);
  }

  function handleStatusChange(value: SelectValue | null) {
    if (value === 'draft' || value === 'published') setStatus(value);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-6 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
        {message && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
            {message}
          </p>
        )}

        {book?.status === 'archived' && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
            This book is archived. Saving it will restore it as a draft.
          </p>
        )}

        <input type="hidden" name="id" value={book?.id ?? ''} />
        <input type="hidden" name="cover_path" value={book?.cover_path ?? ''} />
        <input type="hidden" name="ebook_path" value={book?.ebook_path ?? ''} />

        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-bold text-gray-900">
            Book title
          </label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(event) => {
              const nextTitle = event.target.value;
              setTitle(nextTitle);
              if (!slugEdited) setSlug(slugify(nextTitle));
            }}
            maxLength={180}
            required
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="slug" className="mb-2 block text-sm font-bold text-gray-900">
            Store URL
          </label>
          <div className="flex rounded-xl border border-stone-300 bg-white shadow-sm focus-within:border-purple-700 focus-within:ring-2 focus-within:ring-purple-200">
            <span className="flex items-center border-r border-stone-200 px-3 text-sm text-gray-500">
              /books/
            </span>
            <input
              id="slug"
              name="slug"
              value={slug}
              onChange={(event) => {
                setSlug(event.target.value.toLowerCase());
                setSlugEdited(true);
              }}
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              required
              className="min-h-12 min-w-0 flex-1 rounded-r-xl px-3 text-gray-950 focus:outline-none"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Lowercase letters, numbers, and hyphens only.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="product-type" className="mb-2 block text-sm font-bold text-gray-900">
              Format
            </label>
            <SelectField
              inputId="product-type"
              value={productType}
              options={productOptions}
              onChange={handleProductChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="mb-2 block text-sm font-bold text-gray-900">
              Price (USD)
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center font-semibold text-gray-500">$</span>
              <input
                id="price"
                name="price"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                defaultValue={book?.price_cents != null ? (book.price_cents / 100).toFixed(2) : ''}
                className={`${fieldClassName} pl-8`}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-bold text-gray-900">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={7}
            maxLength={5000}
            defaultValue={book?.description ?? ''}
            className={`${fieldClassName} resize-y`}
          />
        </div>

        <div className="border-t border-stone-200 pt-6">
          <h2 className="font-playfair text-2xl font-semibold text-gray-950">Book files</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Drafts can be saved without files. Files are required before publishing.
          </p>
        </div>

        <div>
          <label htmlFor="cover-file" className="mb-2 block text-sm font-bold text-gray-900">
            Cover image
          </label>
          <input
            id="cover-file"
            name="cover_file"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="block w-full rounded-xl border border-stone-300 bg-stone-50 text-sm text-gray-700 file:mr-4 file:border-0 file:border-r file:border-stone-300 file:bg-white file:px-4 file:py-3 file:font-bold file:text-purple-700 hover:file:bg-purple-50"
          />
          <p className="mt-2 text-sm text-gray-500">
            JPG, PNG, or WebP. Maximum 10 MB.
            {book?.cover_path && ` Current: ${fileNameFromPath(book.cover_path)}`}
          </p>
        </div>

        <div>
          <label htmlFor="cover-alt" className="mb-2 block text-sm font-bold text-gray-900">
            Cover image description
          </label>
          <input
            id="cover-alt"
            name="cover_alt"
            maxLength={180}
            defaultValue={book?.cover_alt ?? ''}
            placeholder="Example: Cover of What’s Your Fruit Language?"
            className={fieldClassName}
          />
          <p className="mt-2 text-sm text-gray-500">Helps visitors who use screen readers.</p>
        </div>

        {productType === 'ebook' && (
          <div>
            <label htmlFor="ebook-file" className="mb-2 block text-sm font-bold text-gray-900">
              eBook file
            </label>
            <input
              id="ebook-file"
              name="ebook_file"
              type="file"
              accept="application/pdf,application/epub+zip,.pdf,.epub"
              className="block w-full rounded-xl border border-stone-300 bg-stone-50 text-sm text-gray-700 file:mr-4 file:border-0 file:border-r file:border-stone-300 file:bg-white file:px-4 file:py-3 file:font-bold file:text-purple-700 hover:file:bg-purple-50"
            />
            <p className="mt-2 text-sm text-gray-500">
              PDF or EPUB. Maximum 100 MB.
              {book?.ebook_path && ` Current: ${fileNameFromPath(book.ebook_path)}`}
            </p>
          </div>
        )}
      </div>

      <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
          <label htmlFor="book-status" className="mb-2 block text-sm font-bold text-gray-900">
            Status
          </label>
          <SelectField
            inputId="book-status"
            value={status}
            options={statusOptions}
            onChange={handleStatusChange}
            required
          />
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Drafts stay private. Published books will be available to the future customer catalog.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-gold px-6 py-3 font-bold text-brand-black shadow-md transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-lg active:translate-y-0 disabled:cursor-wait disabled:opacity-70 disabled:transform-none"
          >
            {isSubmitting ? 'Saving…' : book ? 'Save changes' : 'Create book'}
          </button>
          <Link
            href="/admin/books"
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-stone-100 hover:text-gray-950"
          >
            Cancel
          </Link>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5">
          <p className="font-bold text-purple-950">Before publishing</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-purple-900">
            <li>Complete the description and price.</li>
            <li>Add a cover image.</li>
            {productType === 'ebook' && <li>Add the downloadable eBook file.</li>}
          </ul>
        </div>
      </aside>
    </form>
  );
}
