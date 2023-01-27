import React, { useEffect } from 'react';

import { es } from '@i18n';
import { DialogRemove } from '@shared';

import { useCategorySelectAllRefresh, useCategoryDelete } from '../../hooks';

interface IProps {
  id?: string;
  isOpen: boolean;
  onDismiss(): void;
}

const CategoryDialogRemove: React.FC<IProps> = ({ id, isOpen, onDismiss }) => {
  const { data, isLoading, isSuccess, mutate, reset } = useCategoryDelete();
  const refresh = useCategorySelectAllRefresh();

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
      title={es.category.pages.remove.title}
    />
  );
};

export { CategoryDialogRemove };
