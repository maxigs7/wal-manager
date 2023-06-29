'use client';
import { useEffect } from 'react';

import { ModalBody, ModalFooter, Text } from '@chakra-ui/react';

import { es } from '@/i18n';
import { CancelButton, DeleteButton } from '@/m/shared/buttons';
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
      <ModalBody>
        {es.account.pages.remove.warning.first}
        <Text as="strong" fontWeight="bold">
          {name}
        </Text>
        {es.account.pages.remove.warning.last}
      </ModalBody>

      <ModalFooter>
        <DeleteButton isLoading={isLoading} mr="2" onClick={onDeleteConfirm} />
        <CancelButton onClick={onClose} />
      </ModalFooter>
    </>
  );
};

export default AccountDeleteModal;
