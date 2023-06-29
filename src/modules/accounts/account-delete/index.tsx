'use client';
import { useEffect } from 'react';

import { Button, Icon, ModalBody, ModalFooter, Text } from '@chakra-ui/react';

import { es } from '@/i18n';
import { CloseIcon, TrashIcon } from '@/m/shared/icons';
import { useModalManager } from '@/m/shared/modal-manager/provider';

import { useAccountDelete, useAccountSelectAllRefresh } from '../query';

export type AccountDeleteModalProps = {
  name: string;
  id: string;
};

const AccountDeleteModal: React.FC<AccountDeleteModalProps> = ({ id, name }) => {
  const { onClose } = useModalManager();
  const { data, isLoading, isSuccess, mutate, reset } = useAccountDelete();
  const refresh = useAccountSelectAllRefresh();

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
        {es.account.pages.remove.warning.first}
        <Text as="strong" fontWeight="bold">
          {name}
        </Text>
        {es.account.pages.remove.warning.last}
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

export default AccountDeleteModal;
