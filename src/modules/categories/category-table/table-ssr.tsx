import 'server-only';
import React from 'react';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { select } from '@/supabase';

import { CategoryTableContainer } from './table-container';

const CategoryTableSSR: React.FC = async () => {
  const supabase = createServerClient();

  const data = await select<'category'>(
    supabase,
    'category',
  )({ order: { field: 'name', ascending: true } });

  return <CategoryTableContainer data={data || []} />;
};

export { CategoryTableSSR };
