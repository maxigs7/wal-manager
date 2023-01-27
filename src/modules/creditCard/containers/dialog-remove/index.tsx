import React, { useEffect } from 'react';


import { es } from '@/i18n';
import { DialogRemove } from '@/shared';

import { useCreditCardSelectAllRefresh, useCreditCardDelete } from '../../hooks';

interface IProps {
  id?: string;
  isOpen: boolean;
  onDismiss(): void;
}

const CreditCardDialogRemove: React.FC<IProps> = ({ id, isOpen, onDismiss }) => {
  const { data, isLoading, isSuccess, mutate, reset } = useCreditCardDelete();
  const refresh = useCreditCardSelectAllRefresh();

  const onConfirm = () => {
    id && mutate(id);
  };

  useEffect(() => {
    if (isSuccess && data) {
      reset();
      refresh(data.id);
      onDismiss();
    }
  }, [data, isSuccess, onDismiss, refresh, reset]);

  return (
    <DialogRemove
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onDismiss}
      onConfirm={onConfirm}
      title={es.creditCard.pages.remove.title}
    />
  );
};

export { CreditCardDialogRemove };
