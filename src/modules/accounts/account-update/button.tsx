'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { es } from '@/i18n';
import { AccountInsert } from '@/models';
import { routes } from '@/routes';

import { useAccountUpdate } from '../query';

const UpdateAccountButton: React.FC = () => {
  const router = useRouter();
  const { handleSubmit, formState } = useFormContext<AccountInsert>();
  const { isSubmitting: isFormSubmitting } = formState;
  const { isLoading: isAsyncSubmitting, mutateAsync: updateAccount } = useAccountUpdate();

  const onSubmit = handleSubmit((model) => {
    const onSuccess = () => router.push(routes.settings.account.index);
    const options = { onSuccess };
    return updateAccount(model, options);
  });

  return (
    <Button
      colorScheme="accent"
      isLoading={isFormSubmitting || isAsyncSubmitting}
      onClick={onSubmit}
      size="sm"
    >
      {es.common.save}
    </Button>
  );
};

export { UpdateAccountButton };
