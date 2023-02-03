import { headers, cookies } from 'next/headers';

import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/models';

export const createServerClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
