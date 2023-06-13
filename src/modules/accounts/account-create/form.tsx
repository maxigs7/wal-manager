'use client';

import React, { useEffect } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { AccountInsert } from '@/models';

import { AccountForm } from '../account-form';

const AccountFormContainer: React.FC = () => {
  const { control, setValue } = useFormContext<AccountInsert>();

  const currency = useWatch({
    control: control,
    name: 'currency',
  });

  useEffect(() => {
    if (currency === 'ars') {
      setValue('quotationId', undefined);
    }
  }, [currency, setValue]);

  return <AccountForm />;
};

export { AccountFormContainer };
