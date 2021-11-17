import React, { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useTransactionMutations } from '@api';
import { TransactionCreateForm } from '@components';
import { useUser } from '@lib/supabase';
import { ModalForm } from '@lib/wal-ui';
import { Transaction, TransactionType } from '@models';

const TransactionModalCreateForm: React.FC<IProps> = ({ isOpen, onConfirmed, onDismiss, type }) => {
  const { user } = useUser();
  const { create } = useTransactionMutations();
  const { data, isLoading: isSubmitting, isSuccess } = create;

  const defValue: Partial<Transaction> = useMemo(
    () => ({ userId: user?.id as string, type: type }),
    [user?.id],
  );

  /// HANDLERS
  const onConfirm = (model: Transaction) => {
    if (isSubmitting) return;

    return create.mutate(model);
  };

  const renderForm = (props: UseFormReturn<Transaction>) => {
    return <TransactionCreateForm {...props} type={type} />;
  };

  useEffect(() => {
    if (isSuccess && data) {
      onConfirmed(data);
    }
  }, [data, isSuccess]);

  return (
    <ModalForm
      actionButtonIcon="save"
      actionButtonText="Guardar"
      defaultValue={defValue}
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      onClose={onDismiss}
      onConfirm={onConfirm}
      size="6xl"
      title="Nueva transaccion"
    >
      {renderForm}
    </ModalForm>
  );
};

interface IProps {
  isOpen: boolean;
  onConfirmed(transaction: Transaction): void;
  onDismiss(): void;
  type: TransactionType;
}

export { TransactionModalCreateForm };
