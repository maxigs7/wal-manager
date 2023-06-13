import { notFound } from 'next/navigation';
import React from 'react';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { select, selectById } from '@/supabase';

import { AccountFormProvider } from '../account-form/form-provider';
import { AccountFormContainer } from './form';

type Props = {
  id: string;
};

/* @ts-expect-error Async Server Component */
const AccountUpdateFormSSR: React.FC<Props> = async ({ id }) => {
  const supabase = createServerClient();
  const quotations = await select<'quotation'>(
    supabase,
    'quotation',
  )({ order: { field: 'name', ascending: true } });
  const account = await selectById<'account'>(supabase, 'account')(id);

  if (!account) {
    notFound();
  }

  return (
    <AccountFormProvider quotations={quotations}>
      <AccountFormContainer account={account} />
    </AccountFormProvider>
  );
};

export { AccountUpdateFormSSR };
