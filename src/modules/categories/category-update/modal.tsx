'use client';
import { useCallback } from 'react';

import { ModalBody, ModalFooter } from '@chakra-ui/react';

import { CancelButton } from '@/m/shared/buttons';
import { ContentLoader } from '@/m/shared/loaders/content-loader';
import { useModalManager } from '@/m/shared/modal-manager/provider';

import { CategoryUseFormProvider } from '../category-form/use-form-provider';
import { useCategorySelectAllRefresh, useCategorySelectById } from '../query';
import { UpdateCategoryButton } from './button';
import { CategoryFormContainer } from './form';

export type CategoryUpdateModalProps = {
  id: string;
};

const CategoryUpdateModal: React.FC<CategoryUpdateModalProps> = ({ id }) => {
  const { onClose } = useModalManager();
  const { data: category } = useCategorySelectById(id);

  const refresh = useCategorySelectAllRefresh();

  const onSuccess = useCallback(() => {
    refresh();
    onClose();
  }, [onClose, refresh]);

  if (!category) return <ContentLoader />;

  return (
    <CategoryUseFormProvider categoryId={category.id} userId={category?.userId}>
      <ModalBody as="form" noValidate>
        <CategoryFormContainer category={category} />
      </ModalBody>
      <ModalFooter>
        <UpdateCategoryButton mr="2" onSuccess={onSuccess} />
        <CancelButton onClick={onClose} />
      </ModalFooter>
    </CategoryUseFormProvider>
  );
};

export default CategoryUpdateModal;
