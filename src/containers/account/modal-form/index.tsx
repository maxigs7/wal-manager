import React, { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useAccountById, useAccountMutations } from '@api';
import { AccountForm } from '@components';
import { useUser } from '@lib/supabase';
import { ModalForm } from '@lib/wal-ui';
import { Account } from '@models';
import { AccountType } from '@models/common';

const AccountModalForm: React.FC<IProps> = ({ id, isOpen, onClose: onCloseModal }) => {
  const { user } = useUser();
  const { data: account, isLoading, refetch } = useAccountById(id);
  const { create, update } = useAccountMutations();
  const { isLoading: isSubmitting, isSuccess } = id ? update : create;
  const title = useMemo(() => (id ? 'Editar cuenta' : 'Nueva cuenta'), [id]);

  const defValue: Partial<Account> = useMemo(
    () => ({ userId: user?.id as string, type: AccountType.Bank }),
    [user?.id],
  );

  /// HANDLERS
  const onConfirm = (model: Account) => {
    if (isSubmitting) return;

    if (!id) {
      return create.mutate(model);
    }
    return update.mutate(model);
  };

  const onClose = () => {
    onCloseModal();
  };

  const renderForm = (props: UseFormReturn<Account>) => {
    return <AccountForm {...props} account={account} />;
  };

  /// EFFECTS
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      onCloseModal();
    }
  }, [isSuccess]);

  return (
    <ModalForm
      actionButtonIcon="save"
      actionButtonText="Guardar"
      defaultValue={defValue}
      isLoading={isLoading}
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      model={account}
      onClose={onClose}
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
  onClose(id?: string): void;
}

export { AccountModalForm };
