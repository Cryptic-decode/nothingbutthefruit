import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AuthCard from '../AuthCard';
import AuthForm from '../AuthForm';
import { createClient } from '@/app/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Choose a new password',
  robots: { index: false, follow: false },
};

export default async function UpdatePasswordPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims.sub) {
    redirect('/auth/forgot-password');
  }

  return (
    <AuthCard
      title="Choose a new password"
      description="Create a new password for your dashboard account."
    >
      <AuthForm mode="update-password" />
    </AuthCard>
  );
}
