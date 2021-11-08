import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config';

export * from './auth';
export * from './context';

export const createSupabaseClient = (): SupabaseClient =>
  createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
