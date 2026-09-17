# Supabase setup

Phase 1 adds the database, authentication, and storage foundation. It does not change the current physical-book storefront.

## 1. Configure the application

1. Use Node.js 22 or newer.
2. Copy `.env.example` to `.env.local` if the file does not already exist.
3. From the Supabase project Connect dialog, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

The publishable key is safe for browser use when Row Level Security is enabled. Do not add a Supabase secret key or legacy service-role key to a public environment variable.

## 2. Apply the database migration

Run `supabase/migrations/202609170001_create_book_catalog.sql` in the Supabase SQL Editor.

The migration creates:

- `admin_users`
- `books`
- Draft, published, and archived book states
- Physical-book and eBook product types
- Public `book-covers` storage
- Private `ebooks` storage
- Row Level Security policies

## 3. Add Pastor Dee as the administrator

1. In Supabase Authentication, create Pastor Dee's user account.
2. Copy the user's UUID.
3. Run this in the SQL Editor, replacing the example UUID:

```sql
insert into public.admin_users (user_id)
values ('00000000-0000-0000-0000-000000000000');
```

Public sign-up is not exposed by the application. Pastor Dee can sign in and access the private dashboard at `/admin`. If she has not set a password yet, she can use **Set or reset password** on that page.

## 4. Configure password recovery

In Supabase Authentication URL Configuration:

1. Set the production Site URL to `https://nothingbutthefruit.com`.
2. Add `http://localhost:3000/auth/callback` for local development.
3. Add `https://nothingbutthefruit.com/auth/callback` for production.

The application sends password-recovery links through this callback before opening the new-password form.

## 5. Configure authentication email delivery

Supabase's default email service is intended only for testing and sends messages only to members of the Supabase project team. Before inviting Pastor Dee or sending her a password-reset email, configure a custom SMTP provider under **Authentication → Emails → SMTP Settings** if her email is not a project-team address.

## Security model

- Visitors can read published books only.
- Authenticated administrators can manage all book records.
- Hard deletion is intentionally unavailable; books will be archived.
- Covers are public storefront assets.
- eBook files remain private.
- Secure customer downloads will be added with payment verification in the payment milestone.
