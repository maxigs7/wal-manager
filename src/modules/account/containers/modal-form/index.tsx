import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useUser } from '@m/auth';
import { Account, DEFAULT_ACCOUNT_TYPE } from '@models';
import {
  CancelButton,
  ModalFormBody,
  ModalFormContainer,
  ModalFormFooter,
  ModalFormHeader,
  SubmitButton,
} from '@shared';

import { AccountForm } from '../../components';
import { useAccountCreate, useAccountGetById, useAccountUpdate } from '../../hooks';

interface IProps {
  id?: string;
  isOpen: boolean;
  onConfirmed(account: Account): void;
  onDismiss(): void;
}

const ModalForm: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss }) => {
  const { user } = useUser();
  const create = useAccountCreate();
  const update = useAccountUpdate();
  const { data: account, isLoading } = useAccountGetById(id);
  const { isLoading: isSubmitting, mutateAsync } = id ? update : create;

  const useFormProps = useForm<Account>({
    defaultValues: { userId: user?.id as string, type: DEFAULT_ACCOUNT_TYPE },
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

  const title = useMemo(() => (id ? 'Editar cuenta' : 'Nueva cuenta'), [id]);

  useEffect(() => {
    if (account) {
      reset(account);
    }
  }, [account]);

  return (
    <ModalFormContainer isOpen={isOpen} onClose={onDismiss} onSubmit={onSubmit} size="3xl">
      <ModalFormHeader onClose={onDismiss}>{title}</ModalFormHeader>
      <ModalFormBody isLoading={isLoading}>
        <AccountForm {...useFormProps} id={id} />
      </ModalFormBody>
      <ModalFormFooter>
        <SubmitButton isSubmitting={isFormSubmitting || isSubmitting}>Guardar</SubmitButton>
        <CancelButton onClick={onDismiss} />
      </ModalFormFooter>
    </ModalFormContainer>
  );
};

export default ModalForm;
