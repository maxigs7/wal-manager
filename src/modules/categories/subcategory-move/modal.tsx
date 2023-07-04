'use client';
import { useCallback } from 'react';

import { ModalBody, ModalFooter } from '@chakra-ui/react';

import { CancelButton } from '@/m/shared/buttons';
import { ContentLoader } from '@/m/shared/loaders/content-loader';
import { useModalManager } from '@/m/shared/modal-manager/provider';

import { useCategorySelectAllRefresh, useCategorySelectLookup } from '../query';
import { SubcategoryMoveForm } from '../subcategory-move-form';
import { SubcategoryMoveFormProvider } from '../subcategory-move-form/form-provider';
import { SubcategoryMoveUseFormProvider } from '../subcategory-move-form/use-form-provider';
import { MoveSubcategoryButton } from './button';

export type SubcategoryMoveModalProps = {
  id: string;
  parentId: string;
};

const CategoryMoveModal: React.FC<SubcategoryMoveModalProps> = ({ id, parentId }) => {
  const { data: categories } = useCategorySelectLookup({
    excludeChildren: true,
    excludeId: [parentId],
  });
  const { onClose } = useModalManager();
  const refresh = useCategorySelectAllRefresh();

  const onSuccess = useCallback(() => {
    refresh();
    onClose();
  }, [onClose, refresh]);

  if (!categories) {
    return <ContentLoader />;
  }

  return (
    <SubcategoryMoveUseFormProvider id={id} parentId={parentId}>
      <ModalBody as="form" noValidate>
        <SubcategoryMoveFormProvider categories={categories}>
          <SubcategoryMoveForm />
        </SubcategoryMoveFormProvider>
      </ModalBody>
      <ModalFooter>
        <MoveSubcategoryButton mr="2" onSuccess={onSuccess} />
        <CancelButton onClick={onClose} />
      </ModalFooter>
    </SubcategoryMoveUseFormProvider>
  );
};

export default CategoryMoveModal;
