'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { es } from '@/i18n';
import { SaveIcon } from '@/m/shared/icons';
import { routes } from '@/routes';

import { AccountFormType } from '../models/account';
import { useAccountInsert } from '../query';

const CreateAccountButton: React.FC<ButtonProps> = (buttonProps) => {
  const router = useRouter();
  const { handleSubmit, formState } = useFormContext<AccountFormType>();
  const { isSubmitting: isFormSubmitting } = formState;
  const { isLoading: isAsyncSubmitting, mutateAsync: insertAccount } = useAccountInsert();

  const onSubmit = handleSubmit((account) => {
    const onSuccess = () => router.push(routes.settings.account.index);
    const options = { onSuccess };
    return insertAccount(account, options);
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

export { CreateAccountButton };
