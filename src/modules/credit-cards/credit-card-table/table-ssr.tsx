import 'server-only';
import React from 'react';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { select } from '@/supabase';

import { CreditCardTableContainer } from './table-container';

const CreditCardTableSSR: React.FC = async () => {
  const supabase = createServerClient();

  const data = await select<'creditCard'>(
    supabase,
    'creditCard',
  )({ order: { field: 'name', ascending: true } });
  return <CreditCardTableContainer data={data || []} />;
};

export { CreditCardTableSSR };
