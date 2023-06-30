'use client';
import { useEffect } from 'react';

import { ModalBody, ModalFooter, Text } from '@chakra-ui/react';

import { es } from '@/i18n';
import { CancelButton, DeleteButton } from '@/m/shared/buttons';
import { useModalManager } from '@/m/shared/modal-manager/provider';

import { useCategoryDelete, useCategorySelectAllRefresh } from '../query';

export type CategoryDeleteModalProps = {
  name: string;
  id: string;
};

const CategoryDeleteModal: React.FC<CategoryDeleteModalProps> = ({ id, name }) => {
  const { onClose } = useModalManager();
  const { data, isLoading, isSuccess, mutate, reset } = useCategoryDelete();
  const refresh = useCategorySelectAllRefresh();

  const onDeleteConfirm = () => {
    id && mutate(id);
  };

  useEffect(() => {
    if (isSuccess && data) {
      reset();
      refresh(id);
      onClose();
    }
  }, [data, reset, isSuccess, onClose, refresh, id]);

  return (
    <>
      <ModalBody>
        {es.category.pages.remove.warning.first}
        <Text as="strong" fontWeight="bold">
          {name}
        </Text>
        {es.category.pages.remove.warning.last}
      </ModalBody>

      <ModalFooter>
        <DeleteButton isLoading={isLoading} mr="2" onClick={onDeleteConfirm} />
        <CancelButton onClick={onClose} />
      </ModalFooter>
    </>
  );
};

export default CategoryDeleteModal;
