import React from 'react';

// import { useCategory } from '@app/api/categories';
import { DeleteDialog } from '@lib/wal-ui';

const CategoryDeleteDialog: React.FC<IProps> = ({ id, isOpen, onClose }) => {
  // const [{ isLoading }, { remove }] = useCategory();
  const isLoading = true;
  const remove = async (id: string) => {
    console.log(id);
  };

  const onConfirm = async () => {
    await remove(id as string);
    onClose(true);
  };

  const onCloseDialog = () => {
    onClose();
  };

  if (!id) return null;

  return (
    <DeleteDialog
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onCloseDialog}
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
