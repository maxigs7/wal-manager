import React, { useEffect } from 'react';

import { useCreditCardMutations } from '@api';
import { DeleteDialog } from '@lib/wal-ui';

const CreditCardDeleteDialog: React.FC<IProps> = ({ id, isOpen, onClose }) => {
  const { remove } = useCreditCardMutations();

  const onConfirm = async () => {
    id && remove.mutate(id);
  };

  useEffect(() => {
    if (remove.isSuccess) {
      onClose();
    }
  }, [remove.isSuccess]);

  return (
    <DeleteDialog
      isLoading={remove.isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Eliminar Tarjeta"
    />
  );
};

interface IProps {
  id?: string;
  isOpen: boolean;
  onClose(success?: boolean): void;
}

export { CreditCardDeleteDialog };
