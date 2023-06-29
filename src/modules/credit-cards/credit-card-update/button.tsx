'use client';
import React from 'react';

import { ButtonProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { SaveButton } from '@/m/shared/buttons';

import { CreditCardFormType } from '../models/credit-card';
import { useCreditCardUpdate } from '../query';

type Props = ButtonProps & {
  onSuccess: () => void;
};

const UpdateCreditCardButton: React.FC<Props> = ({ onSuccess, ...buttonProps }) => {
  const { handleSubmit, formState } = useFormContext<CreditCardFormType>();
  const { isSubmitting: isFormSubmitting } = formState;
  const { isLoading: isAsyncSubmitting, mutateAsync: updateCreditCard } = useCreditCardUpdate();

  const onSubmit = handleSubmit((creditCard) => {
    const options = { onSuccess };
    return updateCreditCard(creditCard, options);
  });

  return (
    <SaveButton
      {...buttonProps}
      isLoading={isFormSubmitting || isAsyncSubmitting}
      onClick={onSubmit}
    />
  );
};

export { UpdateCreditCardButton };
