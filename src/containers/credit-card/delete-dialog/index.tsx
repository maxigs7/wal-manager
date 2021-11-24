import React, { useEffect } from 'react';

import { useCreditCardMutations } from '@api';
import { DeleteDialog } from '@lib/wal-ui';
import { CreditCard } from '@models';

const CreditCardDeleteDialog: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss }) => {
  const { remove } = useCreditCardMutations();

  const onConfirm = () => {
    id && remove.mutate(id);
  };

  useEffect(() => {
    if (remove.isSuccess) {
      onConfirmed(remove.data);
    }
  }, [remove.data, remove.isSuccess]);

  return (
    <DeleteDialog
      isLoading={remove.isLoading}
      isOpen={isOpen}
      onClose={onDismiss}
      onConfirm={onConfirm}
      title="Eliminar Tarjeta"
    />
  );
};

interface IProps {
  id?: string;
  isOpen: boolean;
  onConfirmed(cc: CreditCard): void;
  onDismiss(): void;
}

export { CreditCardDeleteDialog };
