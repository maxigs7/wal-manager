import 'server-only';

import { cookies } from 'next/headers';

import { createServerComponentClient   } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/models';

export const createServerClient = () =>
  createServerComponentClient  <Database>({
    cookies,
  });
