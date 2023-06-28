'use client';
import { useEffect } from 'react';

import { Button, Icon, ModalBody, ModalFooter, Text } from '@chakra-ui/react';

import { CloseIcon, TrashIcon } from '@/assets';
import { es } from '@/i18n';
import { useModalManager } from '@/m/shared/modal-manager/provider';

import { useCreditCardDelete, useCreditCardSelectAllRefresh } from '../query';

export type CreditCardDeleteModalProps = {
  name: string;
  id: string;
};

const CreditCardDeleteModal: React.FC<CreditCardDeleteModalProps> = ({ id, name }) => {
  const { onClose } = useModalManager();
  const { data, isLoading, isSuccess, mutate, reset } = useCreditCardDelete();
  const refresh = useCreditCardSelectAllRefresh();

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
      <ModalBody pb={6}>
        {es.creditCard.pages.remove.warning.first}
        <Text as="strong" fontWeight="bold">
          {name}
        </Text>
        {es.creditCard.pages.remove.warning.last}
      </ModalBody>

      <ModalFooter>
        <Button
          colorScheme="danger"
          isLoading={isLoading}
          leftIcon={<Icon as={TrashIcon} boxSize="4" />}
          mr={3}
          onClick={onDeleteConfirm}
        >
          {es.common.remove}
        </Button>
        <Button leftIcon={<Icon as={CloseIcon} boxSize="4" />} onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
};

export default CreditCardDeleteModal;
