import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/models';

export const createBrowserClient = () => createClientComponentClient<Database>();
