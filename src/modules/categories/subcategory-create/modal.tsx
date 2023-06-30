'use client';
import { useCallback } from 'react';

import { ModalBody, ModalFooter } from '@chakra-ui/react';

import { CancelButton } from '@/m/shared/buttons';
import { useModalManager } from '@/m/shared/modal-manager/provider';

import { useCategorySelectAllRefresh } from '../query';
import { SubcategoryForm } from '../subcategory-form';
import { SubcategoryUseFormProvider } from '../subcategory-form/use-form-provider';
import { CreateSubcategoryButton } from './button';

export type SubcategoryCreateModalProps = {
  parentId: string;
  userId: string;
};

const SubcategoryCreateModal: React.FC<SubcategoryCreateModalProps> = ({ parentId, userId }) => {
  const { onClose } = useModalManager();
  const refresh = useCategorySelectAllRefresh();

  const onSuccess = useCallback(() => {
    refresh();
    onClose();
  }, [onClose, refresh]);

  return (
    <SubcategoryUseFormProvider parentId={parentId} userId={userId}>
      <ModalBody as="form" noValidate>
        <SubcategoryForm />
      </ModalBody>
      <ModalFooter>
        <CreateSubcategoryButton mr="2" onSuccess={onSuccess} />
        <CancelButton onClick={onClose} />
      </ModalFooter>
    </SubcategoryUseFormProvider>
  );
};

export default SubcategoryCreateModal;
