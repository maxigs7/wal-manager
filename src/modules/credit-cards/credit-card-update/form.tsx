'use client';

import React, { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import { CreditCard } from '@/models';

import { CreditCardForm } from '../credit-card-form';
import { CreditCardFormType } from '../models/credit-card';

type Props = {
  creditCard: CreditCard;
};

const CreditCardFormContainer: React.FC<Props> = ({ creditCard }) => {
  const { reset } = useFormContext<CreditCardFormType>();

  useEffect(() => {
    if (creditCard) {
      reset(creditCard);
    }
  }, [creditCard, reset]);

  return <CreditCardForm />;
};

export { CreditCardFormContainer };
