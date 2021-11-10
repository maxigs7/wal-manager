import React, { useEffect } from 'react';

import { useCategoryMutations } from '@api';
import { DeleteDialog } from '@lib/wal-ui';
import { Category } from '@models';

const CategoryDeleteDialog: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss }) => {
  const { remove } = useCategoryMutations();

  const onConfirm = async () => {
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
      title="Eliminar Categoria"
    />
  );
};

interface IProps {
  id?: string;
  isOpen: boolean;
  onConfirmed(data: Category): void;
  onDismiss(): void;
}

export { CategoryDeleteDialog };
