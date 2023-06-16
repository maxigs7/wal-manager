'use client';

import React, { useEffect } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { AccountForm } from '../account-form';
import { AccountFormType } from '../models/account';

const AccountFormContainer: React.FC = () => {
  const { control, setValue } = useFormContext<AccountFormType>();

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
