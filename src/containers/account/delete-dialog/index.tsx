import React, { useEffect } from 'react';

import { useAccountMutations } from '@api';
import { DeleteDialog } from '@lib/wal-ui';
import { Account } from '@models';

const AccountDeleteDialog: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss }) => {
  const { remove } = useAccountMutations();

  const onConfirm = () => {
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
  onConfirmed(data: Account): void;
  onDismiss(): void;
}

export { AccountDeleteDialog };
