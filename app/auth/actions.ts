'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import { siteConfig } from '@/app/lib/site';

export interface AuthActionState {
  message: string;
  status: 'idle' | 'error' | 'success';
}

function readText(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function signIn(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = readText(formData, 'email');
  const password = readText(formData, 'password');

  if (!isEmail(email) || !password) {
    return {
      status: 'error',
      message: 'Enter your email address and password.',
    };
  }

  const supabase = await createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    return {
      status: 'error',
      message: 'The email address or password is incorrect.',
    };
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');

  if (adminError || !isAdmin) {
    await supabase.auth.signOut();
    return {
      status: 'error',
      message: 'This account does not have dashboard access.',
    };
  }

  redirect('/admin');
}

export async function requestPasswordReset(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = readText(formData, 'email');

  if (!isEmail(email)) {
    return {
      status: 'error',
      message: 'Enter a valid email address.',
    };
  }

  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const redirectTo = new URL('/auth/callback?next=/auth/update-password', siteUrl);
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo.toString(),
  });

  if (error) {
    return {
      status: 'error',
      message: 'We could not send the reset email. Please try again shortly.',
    };
  }

  return {
    status: 'success',
    message: 'If an account exists for that email, a reset link is on its way.',
  };
}

export async function updatePassword(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const password = readText(formData, 'password');
  const confirmation = readText(formData, 'confirmation');

  if (password.length < 8) {
    return {
      status: 'error',
      message: 'Use at least 8 characters for your new password.',
    };
  }

  if (password !== confirmation) {
    return {
      status: 'error',
      message: 'The passwords do not match.',
    };
  }

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();

  if (!claimsData?.claims.sub) {
    return {
      status: 'error',
      message: 'This reset link has expired. Please request a new one.',
    };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return {
      status: 'error',
      message: 'We could not update your password. Please request a new link.',
    };
  }

  redirect('/admin');
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin');
}
