'use client';

import React, { PropsWithChildren } from 'react';

import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { DEFAULT_ACCOUNT_TYPE, DEFAULT_CURRENCY } from '@/models';

import { AccountFormType, accountFormSchema } from '../models/account';
import { useAccountNameIsUnique } from '../query';

type Props = PropsWithChildren & { accountId?: string; userId?: string };

const AccountUseFormProvider: React.FC<Props> = ({ accountId, children, userId }) => {
  const isUnique = useAccountNameIsUnique();
  const validationSchema = accountFormSchema(isUnique, accountId);
  const form = useForm<AccountFormType>({
    defaultValues: {
      currency: DEFAULT_CURRENCY,
      isPrimary: false,
      type: DEFAULT_ACCOUNT_TYPE,
      userId: userId,
    },
    mode: 'onBlur',
    resolver: yupResolver<AccountFormType>(validationSchema),
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

export { AccountUseFormProvider };
