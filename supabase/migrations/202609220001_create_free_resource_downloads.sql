create table public.free_resource_downloads (
  id uuid primary key default gen_random_uuid(),
  resource_slug text not null,
  full_name text not null,
  email text not null,
  created_at timestamptz not null default now(),
  constraint free_resource_downloads_resource_check
    check (resource_slug = '7-day-fruit-check'),
  constraint free_resource_downloads_name_check
    check (length(trim(full_name)) between 2 and 100),
  constraint free_resource_downloads_email_check
    check (
      email = lower(email)
      and length(email) <= 254
      and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    ),
  constraint free_resource_downloads_unique_request
    unique (resource_slug, email)
);

alter table public.free_resource_downloads enable row level security;

revoke all on table public.free_resource_downloads from anon, authenticated;
grant insert on table public.free_resource_downloads to anon, authenticated;
grant select on table public.free_resource_downloads to authenticated;

create policy "Visitors can request the free resource"
on public.free_resource_downloads
for insert
to anon, authenticated
with check (
  resource_slug = '7-day-fruit-check'
  and length(trim(full_name)) between 2 and 100
  and email = lower(email)
  and length(email) <= 254
);

create policy "Admins can view free resource requests"
on public.free_resource_downloads
for select
to authenticated
using ((select public.is_admin()));
