import 'server-only';

import { redirect } from 'next/navigation';
import { cache } from 'react';
import { createClient } from './server';

export interface AdminSession {
  email: string | null;
  userId: string;
}

export const getAdminSession = cache(async (): Promise<AdminSession | null> => {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();

  if (claimsError || !claimsData?.claims.sub) {
    return null;
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');

  if (adminError || !isAdmin) {
    return null;
  }

  return {
    userId: claimsData.claims.sub,
    email:
      typeof claimsData.claims.email === 'string'
        ? claimsData.claims.email
        : null,
  };
});

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin');
  }

  return session;
}
