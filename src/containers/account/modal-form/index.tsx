import React, { useMemo } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

import { useAccountById, useAccountMutations } from '@api';
import { AccountForm } from '@components';
import { useUser } from '@lib/supabase';
import { ModalForm } from '@lib/wal-ui';
import { Account } from '@models';
import { AccountType } from '@models/common';

const AccountModalForm: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss }) => {
  const { user } = useUser();
  const { data: account, isLoading } = useAccountById(id);
  const { create, update } = useAccountMutations();
  const { isLoading: isSubmitting } = id ? update : create;
  const title = useMemo(() => (id ? 'Editar cuenta' : 'Nueva cuenta'), [id]);

  const defValue: Partial<Account> = useMemo(
    () => ({ userId: user?.id as string, type: AccountType.Bank }),
    [user?.id],
  );

  /// HANDLERS
  const onConfirm: SubmitHandler<Account> = (model) => {
    if (isSubmitting) return;

    if (!id) {
      return create.mutateAsync(model, {
        onSuccess: onConfirmed,
      });
    }
    return update.mutateAsync(model, {
      onSuccess: onConfirmed,
    });
  };

  const renderForm = (props: UseFormReturn<Account>) => {
    return <AccountForm {...props} account={account} />;
  };

  return (
    <ModalForm
      actionButtonIcon="save"
      actionButtonText="Guardar"
      defaultValue={defValue}
      isLoading={isLoading}
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      model={account}
      onClose={onDismiss}
      onConfirm={onConfirm}
      size="3xl"
      title={title}
    >
      {renderForm}
    </ModalForm>
  );
};

interface IProps {
  id?: string;
  isOpen: boolean;
  onConfirmed(account: Account): void;
  onDismiss(): void;
}

export { AccountModalForm };
