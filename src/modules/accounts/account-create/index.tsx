import 'server-only';
import React from 'react';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { Quotation } from '@/models';
import { select } from '@/supabase';

import { AccountFormProvider } from '../account-form/form-provider';
import { AccountFormContainer } from './form';

/* @ts-expect-error Async Server Component */
const AccountCreateFormSSR: React.FC = async () => {
  // Initialize Supabase client
  const supabase = createServerClient();

  // Fetch quotations from database
  const quotations: Quotation[] = await select<'quotation'>(
    supabase,
    'quotation',
  )({
    order: { field: 'name', ascending: true },
  });

  // Render AccountFormContainer with quotations
  return (
    <AccountFormProvider quotations={quotations}>
      <AccountFormContainer />
    </AccountFormProvider>
  );
};

export { AccountCreateFormSSR };
