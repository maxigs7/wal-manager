import 'server-only';
import React from 'react';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { select } from '@/supabase';

import { AccountList } from './list';

const AccountListSSR: React.FC = async () => {
  const supabase = createServerClient();

  const data = await select<'account'>(
    supabase,
    'account',
  )({ order: { field: 'name', ascending: true } });

  return <AccountList data={data || []} />;
};

export { AccountListSSR };
