'use client';

import React, { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import { CreditCard } from '@/models';

import { CreditCardForm } from '../credit-card-form';
import { CreditCardFormType } from '../models/credit-card';
import { useCreditCardSelectById } from '../query';

type Props = {
  creditCard: CreditCard;
};

const CreditCardFormContainer: React.FC<Props> = ({ creditCard: initialCreditCard }) => {
  const { reset } = useFormContext<CreditCardFormType>();
  const { data: creditCard } = useCreditCardSelectById(initialCreditCard.id, initialCreditCard);

  useEffect(() => {
    if (creditCard) {
      reset(creditCard);
    }
  }, [creditCard, reset]);

  return <CreditCardForm />;
};

export { CreditCardFormContainer };
