import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/models';

export const createBrowserClient = () => createBrowserSupabaseClient<Database>();
