'use client';
import { useCallback } from 'react';

import { ModalBody, ModalFooter } from '@chakra-ui/react';

import { CancelButton } from '@/m/shared/buttons';
import { useModalManager } from '@/m/shared/modal-manager/provider';

import { CreditCardForm } from '../credit-card-form';
import { CreditCardUseFormProvider } from '../credit-card-form/use-form-provider';
import { useCreditCardSelectAllRefresh } from '../query';
import { CreateCreditCardButton } from './button';

export type CreditCardCreateModalProps = {
  userId: string;
};

const CreditCardCreateModal: React.FC<CreditCardCreateModalProps> = ({ userId }) => {
  const { onClose } = useModalManager();
  const refresh = useCreditCardSelectAllRefresh();

  const onSuccess = useCallback(() => {
    refresh();
    onClose();
  }, [onClose, refresh]);

  return (
    <CreditCardUseFormProvider userId={userId}>
      <ModalBody as="form" noValidate>
        <CreditCardForm />
      </ModalBody>
      <ModalFooter>
        <CreateCreditCardButton mr="2" onSuccess={onSuccess} />
        <CancelButton onClick={onClose} />
      </ModalFooter>
    </CreditCardUseFormProvider>
  );
};

export default CreditCardCreateModal;
