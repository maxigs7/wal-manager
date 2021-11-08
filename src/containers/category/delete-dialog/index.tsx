import React, { useEffect } from 'react';

import { useCategoryMutations } from '@api';
import { DeleteDialog } from '@lib/wal-ui';

const CategoryDeleteDialog: React.FC<IProps> = ({ id, isOpen, onClose }) => {
  const { remove } = useCategoryMutations();

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
      title="Eliminar Categoria"
    />
  );
};

interface IProps {
  id?: string;
  isOpen: boolean;
  onClose(success?: boolean): void;
}

export { CategoryDeleteDialog };
