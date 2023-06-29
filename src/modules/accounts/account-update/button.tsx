'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { es } from '@/i18n';
import { SaveIcon } from '@/m/shared/icons';
import { routes } from '@/routes';

import { AccountFormType } from '../models/account';
import { useAccountUpdate } from '../query';

const UpdateAccountButton: React.FC<ButtonProps> = (buttonProps) => {
  const router = useRouter();
  const { handleSubmit, formState } = useFormContext<AccountFormType>();
  const { isSubmitting: isFormSubmitting } = formState;
  const { isLoading: isAsyncSubmitting, mutateAsync: updateAccount } = useAccountUpdate();

  const onSubmit = handleSubmit((model) => {
    const onSuccess = () => router.push(routes.settings.account.index);
    const options = { onSuccess };
    return updateAccount(model, options);
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

export { UpdateAccountButton };
