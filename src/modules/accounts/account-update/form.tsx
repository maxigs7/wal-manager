'use client';

import React, { useEffect } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { Account } from '@/models';

import { AccountForm } from '../account-form';
import { AccountFormType } from '../models/account';
import { useAccountSelectById } from '../query';

type Props = {
  account: Account;
};

const AccountFormContainer: React.FC<Props> = ({ account: initialAccount }) => {
  const { control, setValue, reset } = useFormContext<AccountFormType>();
  const { data: account } = useAccountSelectById(initialAccount, initialAccount.id);

  const currency = useWatch({
    control: control,
    name: 'currency',
  });

  useEffect(() => {
    if (currency === 'ars') {
      setValue('quotationId', undefined);
    }
  }, [currency, setValue]);

  useEffect(() => {
    if (account) {
      reset(account);
    }
  }, [account, reset]);

  return <AccountForm />;
};

export { AccountFormContainer };
