'use client';

import React, { PropsWithChildren } from 'react';

import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { DEFAULT_CREDIT_CARD_TYPE } from '@/models';

import { CreditCardFormType, creditCardFormSchema } from '../models/credit-card';
import { useCreditCardNameIsUnique } from '../query';

type Props = PropsWithChildren & { creditCardId?: string; userId?: string };

const CreditCardUseFormProvider: React.FC<Props> = ({ creditCardId, children, userId }) => {
  const isUnique = useCreditCardNameIsUnique();
  const validationSchema = creditCardFormSchema(isUnique, creditCardId);
  const form = useForm<CreditCardFormType>({
    defaultValues: {
      type: DEFAULT_CREDIT_CARD_TYPE,
      userId: userId,
    },
    resolver: yupResolver<CreditCardFormType>(validationSchema),
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

export { CreditCardUseFormProvider };
