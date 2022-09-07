import { Box, Button, Flex, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useUser } from '@m/auth';
import { Account, DEFAULT_ACCOUNT_TYPE } from '@models';
import { ActionsFormContainer, Icon } from '@shared';

import { AccountForm } from '../../components';
import { useAccountCreate, useAccountGetById, useAccountUpdate } from '../../hooks';
import Actions from './actions';

interface IProps {
  id?: string;
  onConfirmed(account: Account): void;
}

const AccountFormContainer: React.FC<IProps> = ({ id, onConfirmed }) => {
  const { user } = useUser();
  const create = useAccountCreate();
  const update = useAccountUpdate();
  const { data: account, isLoading } = useAccountGetById(id);
  const { isLoading: isSubmitting, mutateAsync } = id ? update : create;

  const useFormProps = useForm<Account>({
    defaultValues: { userId: user?.id as string, type: DEFAULT_ACCOUNT_TYPE, isDefault: false },
  });
  const {
    formState: { isSubmitting: isFormSubmitting },
    handleSubmit,
    reset,
  } = useFormProps;

  const onSubmit = handleSubmit((model) => {
    return mutateAsync(model, {
      onSuccess: onConfirmed,
    });
  });

  useEffect(() => {
    if (account) {
      reset(account);
    }
  }, [account, reset]);

  return (
    <Box as="form" bg="white" onSubmit={onSubmit}>
      <Actions display={['none', 'flex']} isLoading={isSubmitting || isFormSubmitting} />
      <Skeleton isLoaded={!isLoading || !id} p="5">
        <AccountForm {...useFormProps} id={id} />
      </Skeleton>
      <Actions display={['flex', 'none']} isLoading={isSubmitting || isFormSubmitting} />
    </Box>
  );
};

export { AccountFormContainer };
