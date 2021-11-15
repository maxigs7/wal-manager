import React from 'react';

import { Portal } from '@chakra-ui/react';

import { CategoryDeleteDialog } from '@containers';
import { Category } from '@models';

import { SubCategoryModalForm } from '../';

const SubCategoryPortalModal: React.FC<IProps> = ({
  id,
  isOpenForm,
  isOpenRemove,
  onConfirmed,
  onDismiss,
  parent,
}) => {
  if (!isOpenForm && !isOpenRemove) {
    return null;
  }

  return (
    <Portal>
      {isOpenForm && (
        <SubCategoryModalForm
          id={id}
          isOpen={isOpenForm}
          onConfirmed={onConfirmed}
          onDismiss={onDismiss}
          parent={parent}
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
  parent: Category;
}

export { SubCategoryPortalModal };
