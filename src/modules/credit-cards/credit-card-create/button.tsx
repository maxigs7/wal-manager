'use client';

import React from 'react';

import { ButtonProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { SaveButton } from '@/m/shared/buttons';

import { CreditCardFormType } from '../models/credit-card';
import { useCreditCardInsert } from '../query';

type Props = ButtonProps & {
  onSuccess: () => void;
};

const CreateCreditCardButton: React.FC<Props> = ({ onSuccess, ...buttonProps }) => {
  const { handleSubmit, formState } = useFormContext<CreditCardFormType>();
  const { isSubmitting: isFormSubmitting } = formState;
  const { isLoading: isAsyncSubmitting, mutateAsync: insertCreditCard } = useCreditCardInsert();

  const onSubmit = handleSubmit((creditCard) => {
    const options = { onSuccess };
    return insertCreditCard(creditCard, options);
  });

  return (
    <SaveButton
      {...buttonProps}
      isLoading={isFormSubmitting || isAsyncSubmitting}
      onClick={onSubmit}
    />
  );
};

export { CreateCreditCardButton };
