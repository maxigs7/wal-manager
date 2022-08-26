import React, { useEffect } from 'react';

import { CreditCard } from '@models';
import { DialogRemove } from '@shared';

import { useCreditCardRemove } from '../../hooks';

const CreditCardDialogRemove: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss }) => {
  const { data, isLoading, isSuccess, mutate } = useCreditCardRemove();

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
      title="Eliminar Tarjeta"
    />
  );
};

interface IProps {
  id?: string;
  isOpen: boolean;
  onConfirmed(data: CreditCard): void;
  onDismiss(): void;
}

export default CreditCardDialogRemove;
