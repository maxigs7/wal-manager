import React, { useEffect } from 'react';

import { Account } from '@models';
import { DialogRemove } from '@shared';

import { useAccountRemove } from '../../hooks';

const AccountDialogRemove: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss }) => {
  const { data, isLoading, isSuccess, mutate } = useAccountRemove();

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

export default AccountDialogRemove;
