'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database.types';
import { getSupabaseEnvironment } from './env';

export function createClient() {
  const { supabaseUrl, supabasePublishableKey } = getSupabaseEnvironment();

  return createBrowserClient<Database>(supabaseUrl, supabasePublishableKey);
}
