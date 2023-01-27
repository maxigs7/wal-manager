import React, { useEffect } from 'react';

import { Box, Skeleton } from '@chakra-ui/react';
import { useForm, useWatch } from 'react-hook-form';

import { useUser } from '@/m/auth';
import { AccountInsert, DEFAULT_ACCOUNT_TYPE, DEFAULT_CURRENCY } from '@/models';

import { AccountForm } from '../../components';
import { useAccountCreate, useAccountSelectById, useAccountUpdate } from '../../hooks';
import Actions from './actions';


interface IProps {
  id?: string;
  onConfirmed(account: AccountInsert): void;
}

const AccountFormContainer: React.FC<IProps> = ({ id, onConfirmed }) => {
  const { user } = useUser();
  const create = useAccountCreate();
  const update = useAccountUpdate();
  const { data: account, isLoading } = useAccountSelectById(id);
  const { isLoading: isSubmitting, mutateAsync } = id ? update : create;

  const useFormProps = useForm<AccountInsert>({
    defaultValues: {
      currency: DEFAULT_CURRENCY,
      isPrimary: false,
      type: DEFAULT_ACCOUNT_TYPE,
      userId: user?.id as string,
    },
  });
  const {
    formState: { isSubmitting: isFormSubmitting },
    handleSubmit,
    reset,
  } = useFormProps;

  const currency = useWatch({
    control: useFormProps.control,
    name: 'currency',
  });

  const onSubmit = handleSubmit((model) => {
    return mutateAsync(model, {
      onSuccess: onConfirmed,
    });
  });

  useEffect(() => {
    if (currency === 'ars') {
      useFormProps.setValue('quotationId', undefined);
    }
  }, [currency, useFormProps, useFormProps.setValue]);

  useEffect(() => {
    if (account) {
      reset(account);
    }
  }, [account, reset]);

  return (
    <Box as="form" bg="white" onSubmit={onSubmit} noValidate>
      <Actions display={['none', 'flex']} isLoading={isSubmitting || isFormSubmitting} />
      <Skeleton isLoaded={!isLoading || !id} p="5">
        <AccountForm {...useFormProps} currency={currency} id={id} />
      </Skeleton>
      <Actions display={['flex', 'none']} isLoading={isSubmitting || isFormSubmitting} />
    </Box>
  );
};

export { AccountFormContainer };
