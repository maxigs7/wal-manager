'use client';
import React from 'react';

import { ButtonProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { SaveButton } from '@/m/shared/buttons';

import { AccountFormType } from '../models/account';
import { useAccountUpdate } from '../query';

type Props = ButtonProps & {
  onSuccess: () => void;
};

const UpdateAccountButton: React.FC<Props> = ({ onSuccess, ...buttonProps }) => {
  const { handleSubmit, formState } = useFormContext<AccountFormType>();
  const { isSubmitting: isFormSubmitting } = formState;
  const { isLoading: isAsyncSubmitting, mutateAsync: updateAccount } = useAccountUpdate();

  const onSubmit = handleSubmit((account) => {
    const options = { onSuccess };
    return updateAccount(account, options);
  });

  return (
    <SaveButton
      {...buttonProps}
      isLoading={isFormSubmitting || isAsyncSubmitting}
      onClick={onSubmit}
    />
  );
};

export { UpdateAccountButton };
