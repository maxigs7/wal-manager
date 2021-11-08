import React, { useEffect } from 'react';

import { useAccountMutations } from '@api';
import { DeleteDialog } from '@lib/wal-ui';

const AccountDeleteDialog: React.FC<IProps> = ({ id, isOpen, onClose }) => {
  const { remove } = useAccountMutations();

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
      title="Eliminar Cuenta"
    />
  );
};

interface IProps {
  id?: string;
  isOpen: boolean;
  onClose(success?: boolean): void;
}

export { AccountDeleteDialog };
