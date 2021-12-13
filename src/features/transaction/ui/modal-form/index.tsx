import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import {
  Transaction,
  TransactionType,
  useTransactionCreate,
  useTransactionGetById,
  useTransactionUpdate,
  useUser,
} from '@entities';
import {
  CancelButton,
  ModalFormBody,
  ModalFormContainer,
  ModalFormFooter,
  ModalFormHeader,
  SubmitButton,
} from '@shared';

import TransactionCreateForm from '../create-form';

interface IProps {
  id?: string;
  isOpen: boolean;
  onConfirmed(transaction: Transaction): void;
  onDismiss(): void;
  type: TransactionType;
}

const ModalForm: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss, type }) => {
  const { user } = useUser();
  const create = useTransactionCreate();
  const update = useTransactionUpdate();
  const { data: transaction, isLoading } = useTransactionGetById(id);
  const { isLoading: isSubmitting, mutateAsync } = id ? update : create;

  const useFormProps = useForm<Transaction>({
    defaultValues: { userId: user?.id as string, type },
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

  const title = useMemo(() => (id ? 'Editar movimiento' : 'Nueva movimiento'), [id]);

  useEffect(() => {
    if (transaction) {
      reset(transaction);
    }
  }, [transaction]);

  return (
    <ModalFormContainer isOpen={isOpen} onClose={onDismiss} onSubmit={onSubmit} size="5xl">
      <ModalFormHeader onClose={onDismiss}>{title}</ModalFormHeader>
      <ModalFormBody isLoading={isLoading}>
        {!id && <TransactionCreateForm {...useFormProps} type={type} />}
      </ModalFormBody>
      <ModalFormFooter>
        <SubmitButton icon="save" isSubmitting={isFormSubmitting || isSubmitting}>
          Guardar
        </SubmitButton>
        <CancelButton onClick={onDismiss} />
      </ModalFormFooter>
    </ModalFormContainer>
  );
};

export default ModalForm;
