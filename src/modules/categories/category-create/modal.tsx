'use client';
import { useCallback } from 'react';

import { ModalBody, ModalFooter } from '@chakra-ui/react';

import { CancelButton } from '@/m/shared/buttons';
import { useModalManager } from '@/m/shared/modal-manager/provider';

import { CategoryForm } from '../category-form';
import { CategoryUseFormProvider } from '../category-form/use-form-provider';
import { useCategorySelectAllRefresh } from '../query';
import { CreateCategoryButton } from './button';

export type CategoryCreateModalProps = {
  userId: string;
};

const CategoryCreateModal: React.FC<CategoryCreateModalProps> = ({ userId }) => {
  const { onClose } = useModalManager();
  const refresh = useCategorySelectAllRefresh();

  const onSuccess = useCallback(() => {
    refresh();
    onClose();
  }, [onClose, refresh]);

  return (
    <CategoryUseFormProvider userId={userId}>
      <ModalBody as="form" noValidate>
        <CategoryForm />
      </ModalBody>
      <ModalFooter>
        <CreateCategoryButton mr="2" onSuccess={onSuccess} />
        <CancelButton onClick={onClose} />
      </ModalFooter>
    </CategoryUseFormProvider>
  );
};

export default CategoryCreateModal;
