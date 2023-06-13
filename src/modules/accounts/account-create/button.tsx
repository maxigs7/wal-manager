'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { es } from '@/i18n';
import { AccountInsert } from '@/models';
import { routes } from '@/routes';

import { useAccountInsert } from '../query';

const CreateAccountButton: React.FC = () => {
  const router = useRouter();
  const { handleSubmit, formState } = useFormContext<AccountInsert>();
  const { isSubmitting: isFormSubmitting } = formState;
  const { isLoading: isAsyncSubmitting, mutateAsync: insertAccount } = useAccountInsert();

  const onSubmit = handleSubmit((account) => {
    const onSuccess = () => router.push(routes.settings.account.index);
    const options = { onSuccess };
    return insertAccount(account, options);
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

export { CreateAccountButton };
