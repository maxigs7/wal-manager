import React from 'react';

import { Portal } from '@chakra-ui/react';

import { Category, CategoryType } from '@models';

import { CategoryDeleteDialog, CategoryModalForm } from '../';

const CategoryPortalModal: React.FC<IProps> = ({
  id,
  isOpenForm,
  isOpenRemove,
  onConfirmed,
  onDismiss,
  selectedType,
}) => {
  if (!isOpenForm && !isOpenRemove) {
    return null;
  }

  return (
    <Portal>
      {isOpenForm && (
        <CategoryModalForm
          id={id}
          isOpen={isOpenForm}
          onConfirmed={onConfirmed}
          onDismiss={onDismiss}
          type={selectedType}
        />
      )}
      {isOpenRemove && (
        <CategoryDeleteDialog
          id={id}
          isOpen={isOpenRemove}
          onConfirmed={onConfirmed}
          onDismiss={onDismiss}
        />
      )}
    </Portal>
  );
};

interface IProps {
  id?: string;
  isOpenForm: boolean;
  isOpenRemove: boolean;
  onConfirmed(category: Category): void;
  onDismiss(): void;
  selectedType: CategoryType;
}

export { CategoryPortalModal };
