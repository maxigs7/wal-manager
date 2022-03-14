import React, { useEffect } from 'react';

import { Transaction } from '@models';
import { DialogRemove } from '@shared';

import { useTransactionRemove } from '../../hooks';

const TransactionDialogRemove: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss }) => {
  const { data, isLoading, isSuccess, mutate } = useTransactionRemove();

  const onConfirm = () => {
    id && mutate(id);
  };

  useEffect(() => {
    if (isSuccess && data) {
      onConfirmed(data);
    }
  }, [data, isSuccess]);

  return (
    <DialogRemove
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onDismiss}
      onConfirm={onConfirm}
      title="Eliminar movimiento"
    />
  );
};

interface IProps {
  id?: string;
  isOpen: boolean;
  onConfirmed(data: Transaction): void;
  onDismiss(): void;
}

export default TransactionDialogRemove;
