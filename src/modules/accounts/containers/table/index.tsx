import 'server-only';
import React from 'react';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { select } from '@/supabase';

import { AccountTableClient } from './client';

/* @ts-expect-error Async Server Component */
const AccountTableServer: React.FC = async () => {
  const supabase = createServerClient();

  const data = await select<'account'>(
    supabase,
    'account',
  )({ order: { field: 'name', ascending: true } });
  return <AccountTableClient data={data || []} />;
};

export { AccountTableServer };
