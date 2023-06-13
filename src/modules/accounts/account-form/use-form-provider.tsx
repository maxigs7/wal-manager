'use client';

import React, { PropsWithChildren } from 'react';

import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { AccountInsert, DEFAULT_ACCOUNT_TYPE, DEFAULT_CURRENCY } from '@/models';

import { accountFormSchema } from '../models/account';
import { useAccountNameIsUnique } from '../query';

type Props = PropsWithChildren & { accountId?: string; userId?: string };

const AccountUseFormProvider: React.FC<Props> = ({ accountId, children, userId }) => {
  const isUnique = useAccountNameIsUnique();
  const form = useForm<AccountInsert>({
    defaultValues: {
      currency: DEFAULT_CURRENCY,
      isPrimary: false,
      type: DEFAULT_ACCOUNT_TYPE,
      userId: userId,
    },
    resolver: yupResolver(accountFormSchema(isUnique, accountId)),
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

export { AccountUseFormProvider };
