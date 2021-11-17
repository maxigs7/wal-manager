import React, { useEffect } from 'react';

import { useTransactionMutations } from '@api';
import { DeleteDialog } from '@lib/wal-ui';
import { Transaction } from '@models';

const TransactionDeleteDialog: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss }) => {
  const { remove } = useTransactionMutations();

  const onConfirm = async () => {
    id && remove.mutate(id);
  };

  useEffect(() => {
    if (remove.isSuccess && remove.data) {
      onConfirmed(remove.data);
    }
  }, [remove.data, remove.isSuccess]);

  return (
    <DeleteDialog
      isLoading={remove.isLoading}
      isOpen={isOpen}
      onClose={onDismiss}
      onConfirm={onConfirm}
      title="Eliminar Cuenta"
    />
  );
};

interface IProps {
  id?: string;
  isOpen: boolean;
  onConfirmed(data: Transaction): void;
  onDismiss(): void;
}

export { TransactionDeleteDialog };
