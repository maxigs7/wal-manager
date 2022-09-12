import React, { useEffect } from 'react';

import { es } from '@i18n';
import { DialogRemove } from '@shared';

import { useTransactionListRefresh, useTransactionRemove } from '../../hooks';

interface IProps {
  id?: string;
  isOpen: boolean;
  onDismiss(): void;
}

const TransactionDialogRemove: React.FC<IProps> = ({ id, isOpen, onDismiss }) => {
  const { data, isLoading, isSuccess, mutate, reset } = useTransactionRemove();
  const refresh = useTransactionListRefresh();

  const onConfirm = () => {
    id && mutate(id);
  };

  useEffect(() => {
    if (isSuccess && data) {
      reset();
      refresh();
      onDismiss();
    }
  }, [data, isSuccess, onDismiss, refresh, reset]);

  return (
    <DialogRemove
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onDismiss}
      onConfirm={onConfirm}
      title={es.account.pages.remove.title}
    />
  );
};

export { TransactionDialogRemove };
