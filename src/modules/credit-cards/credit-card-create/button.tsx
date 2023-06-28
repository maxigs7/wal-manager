'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { SaveIcon } from '@/assets';
import { es } from '@/i18n';
import { routes } from '@/routes';

import { CreditCardFormType } from '../models/credit-card';
import { useCreditCardInsert } from '../query';

const CreateCreditCardButton: React.FC<ButtonProps> = (buttonProps) => {
  const router = useRouter();
  const { handleSubmit, formState } = useFormContext<CreditCardFormType>();
  const { isSubmitting: isFormSubmitting } = formState;
  const { isLoading: isAsyncSubmitting, mutateAsync: insertCreditCard } = useCreditCardInsert();

  const onSubmit = handleSubmit((creditCard) => {
    const onSuccess = () => router.push(routes.settings.creditCard.index);
    const options = { onSuccess };
    return insertCreditCard(creditCard, options);
  });

  return (
    <Button
      {...buttonProps}
      colorScheme="accent"
      isLoading={isFormSubmitting || isAsyncSubmitting}
      leftIcon={<Icon as={SaveIcon} boxSize="3" />}
      onClick={onSubmit}
      rounded="2xl"
      shadow="md"
      size="sm"
    >
      {es.common.save}
    </Button>
  );
};

export { CreateCreditCardButton };
