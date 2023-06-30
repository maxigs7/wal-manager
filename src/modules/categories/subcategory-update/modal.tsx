'use client';
import { useCallback } from 'react';

import { ModalBody, ModalFooter } from '@chakra-ui/react';

import { CancelButton } from '@/m/shared/buttons';
import { ContentLoader } from '@/m/shared/loaders/content-loader';
import { useModalManager } from '@/m/shared/modal-manager/provider';

import { useCategorySelectAllRefresh, useCategorySelectById } from '../query';
import { SubcategoryUseFormProvider } from '../subcategory-form/use-form-provider';
import { UpdateSubcategoryButton } from './button';
import { SubcategoryFormContainer } from './form';

export type SubcategoryUpdateModalProps = {
  id: string;
};

const SubcategoryUpdateModal: React.FC<SubcategoryUpdateModalProps> = ({ id }) => {
  const { onClose } = useModalManager();
  const { data: subcategory } = useCategorySelectById(id);
  const refresh = useCategorySelectAllRefresh();

  const onSuccess = useCallback(() => {
    refresh();
    onClose();
  }, [onClose, refresh]);

  if (!subcategory) return <ContentLoader />;

  return (
    <SubcategoryUseFormProvider
      categoryId={subcategory.id}
      parentId={subcategory.parentId as string}
      userId={subcategory?.userId}
    >
      <ModalBody as="form" noValidate>
        <SubcategoryFormContainer subcategory={subcategory} />
      </ModalBody>
      <ModalFooter>
        <UpdateSubcategoryButton mr="2" onSuccess={onSuccess} />
        <CancelButton onClick={onClose} />
      </ModalFooter>
    </SubcategoryUseFormProvider>
  );
};

export default SubcategoryUpdateModal;
