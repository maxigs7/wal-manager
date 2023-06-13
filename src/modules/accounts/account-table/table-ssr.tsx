import 'server-only';
import React from 'react';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { select } from '@/supabase';

import { AccountTableContainer } from './table-container';

/* @ts-expect-error Async Server Component */
const AccountTableSSR: React.FC = async () => {
  const supabase = createServerClient();

  const data = await select<'account'>(
    supabase,
    'account',
  )({ order: { field: 'name', ascending: true } });
  return <AccountTableContainer data={data || []} />;
};

export { AccountTableSSR };
