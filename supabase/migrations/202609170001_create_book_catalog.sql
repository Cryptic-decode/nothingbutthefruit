create type public.book_product_type as enum ('physical', 'ebook');
create type public.book_publication_status as enum ('draft', 'published', 'archived');

create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.books (
  id uuid primary key default gen_random_uuid(),
  product_type public.book_product_type not null default 'ebook',
  status public.book_publication_status not null default 'draft',
  title text not null check (length(trim(title)) > 0),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text not null default '',
  price_cents integer check (price_cents is null or price_cents >= 0),
  cover_path text,
  cover_alt text not null default '',
  ebook_path text,
  created_by uuid not null default auth.uid() references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  constraint physical_books_have_no_ebook_file
    check (product_type = 'ebook' or ebook_path is null),
  constraint published_books_are_complete
    check (
      status <> 'published'
      or (
        length(trim(description)) > 0
        and price_cents is not null
        and price_cents > 0
        and cover_path is not null
        and length(trim(cover_path)) > 0
        and (product_type = 'physical' or ebook_path is not null)
      )
    )
);

create unique index books_slug_unique_idx on public.books (lower(slug));
create index books_catalog_idx on public.books (product_type, status, published_at desc);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger books_set_updated_at
before update on public.books
for each row execute function public.set_updated_at();

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.set_updated_at() from public;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.admin_users enable row level security;
alter table public.books enable row level security;

revoke all on table public.admin_users from anon, authenticated;
grant select on table public.admin_users to authenticated;

revoke all on table public.books from anon, authenticated;
grant select on table public.books to anon;
grant select, insert, update on table public.books to authenticated;

create policy "Admins can view their membership"
on public.admin_users
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "Anyone can view published books"
on public.books
for select
to anon, authenticated
using (status = 'published');

create policy "Admins can view all books"
on public.books
for select
to authenticated
using ((select public.is_admin()));

create policy "Admins can create books"
on public.books
for insert
to authenticated
with check (
  (select public.is_admin())
  and created_by = (select auth.uid())
);

create policy "Admins can update books"
on public.books
for update
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values
  (
    'book-covers',
    'book-covers',
    true,
    10485760,
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'ebooks',
    'ebooks',
    false,
    104857600,
    array['application/pdf', 'application/epub+zip']
  )
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Admins can view managed book files"
on storage.objects
for select
to authenticated
using (
  bucket_id in ('book-covers', 'ebooks')
  and (select public.is_admin())
);

create policy "Admins can upload managed book files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id in ('book-covers', 'ebooks')
  and (select public.is_admin())
);

create policy "Admins can update managed book files"
on storage.objects
for update
to authenticated
using (
  bucket_id in ('book-covers', 'ebooks')
  and (select public.is_admin())
)
with check (
  bucket_id in ('book-covers', 'ebooks')
  and (select public.is_admin())
);

create policy "Admins can remove managed book files"
on storage.objects
for delete
to authenticated
using (
  bucket_id in ('book-covers', 'ebooks')
  and (select public.is_admin())
);
