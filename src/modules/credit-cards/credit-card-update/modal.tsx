'use client';
import { useCallback } from 'react';

import { ModalBody, ModalFooter } from '@chakra-ui/react';

import { CancelButton } from '@/m/shared/buttons';
import { ContentLoader } from '@/m/shared/loaders/content-loader';
import { useModalManager } from '@/m/shared/modal-manager/provider';

import { CreditCardUseFormProvider } from '../credit-card-form/use-form-provider';
import { useCreditCardSelectAllRefresh, useCreditCardSelectById } from '../query';
import { UpdateCreditCardButton } from './button';
import { CreditCardFormContainer } from './form';

export type CreditCardUpdateModalProps = {
  creditCardId: string;
};

const CreditCardUpdateModal: React.FC<CreditCardUpdateModalProps> = ({ creditCardId }) => {
  const { onClose } = useModalManager();
  const { data: creditCard } = useCreditCardSelectById(creditCardId);

  const refresh = useCreditCardSelectAllRefresh();

  const onSuccess = useCallback(() => {
    refresh();
    onClose();
  }, [onClose, refresh]);

  if (!creditCard) return <ContentLoader />;

  return (
    <CreditCardUseFormProvider creditCardId={creditCard.id} userId={creditCard?.userId}>
      <ModalBody as="form" noValidate>
        <CreditCardFormContainer creditCard={creditCard} />
      </ModalBody>
      <ModalFooter>
        <UpdateCreditCardButton mr="2" onSuccess={onSuccess} />
        <CancelButton onClick={onClose} />
      </ModalFooter>
    </CreditCardUseFormProvider>
  );
};

export default CreditCardUpdateModal;
