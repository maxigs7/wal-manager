import React from 'react';

import { useCategory } from '@app/api/categories';
import { DeleteDialog } from '@app/modules/common';

const CategoryDeleteDialog: React.FC<IProps> = ({ id, isOpen, onClose }) => {
  const [{ isLoading }, { remove }] = useCategory();

  const onConfirm = async () => {
    await remove(id as string);
    onClose();
  };

  if (!id) return null;

  return (
    <DeleteDialog
      isLoading={isLoading}
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
  onClose(): void;
}

export { CategoryDeleteDialog };
