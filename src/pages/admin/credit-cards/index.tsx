import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/hooks';
import { Portal } from '@chakra-ui/portal';

import { CreditCardsList, CreditCardModalForm, CreditCardDeleteDialog } from '@containers';
import { Page } from '@lib/wal-ui';
import { CreditCard } from '@models';

const CreditCardsPage: React.FC = () => {
  const { isOpen: isOpenForm, onClose: onDismissForm, onOpen: onOpenForm } = useDisclosure();
  const { isOpen: isOpenRemove, onClose: onDismissRemove, onOpen: _onOpenRemove } = useDisclosure();
  const [creditCardId, setCreditCardId] = useState<string>();

  const onSelected = (creditCard: CreditCard) => {
    setCreditCardId(creditCard.id);
    onOpenForm();
  };

  const onConfirmedForm = () => {
    setCreditCardId(undefined);
    onDismissForm();
  };

  const onOpenRemove = (creditCard: CreditCard) => {
    setCreditCardId(creditCard.id);
    _onOpenRemove();
  };

  const onConfirmedRemove = () => {
    setCreditCardId(undefined);
    onDismissRemove();
  };

  console.log('CreditCardsPage rendering...');

  return (
    <>
      <Page metaTitle="Mis Tarjetas" title="Mis Tarjetas">
        <CreditCardsList onCreate={onOpenForm} onDelete={onOpenRemove} onSelected={onSelected} />
        <Portal>
          {isOpenForm && (
            <CreditCardModalForm
              id={creditCardId}
              isOpen={isOpenForm}
              onConfirmed={onConfirmedForm}
              onDismiss={onDismissForm}
            />
          )}
          {isOpenRemove && (
            <CreditCardDeleteDialog
              id={creditCardId}
              isOpen={isOpenRemove}
              onConfirmed={onConfirmedRemove}
              onDismiss={onDismissRemove}
            />
          )}
        </Portal>
      </Page>
    </>
  );
};

export default CreditCardsPage;
