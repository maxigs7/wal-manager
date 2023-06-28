import { notFound } from 'next/navigation';
import React from 'react';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { selectById } from '@/supabase';

import { CreditCardFormContainer } from './form';

type Props = {
  id: string;
};

const CreditCardUpdateFormSSR: React.FC<Props> = async ({ id }) => {
  const supabase = createServerClient();
  const creditCard = await selectById<'creditCard'>(supabase, 'creditCard')(id);

  if (!creditCard) {
    notFound();
  }

  return <CreditCardFormContainer creditCard={creditCard} />;
};

export { CreditCardUpdateFormSSR };
