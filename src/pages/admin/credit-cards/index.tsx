import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/hooks';
import { Portal } from '@chakra-ui/portal';

import { CreditCardsList, CreditCardModalForm, CreditCardDeleteDialog } from '@containers';
import { Page } from '@lib/wal-ui';
import { CreditCard } from '@models/credit-cards';

const CreditCardsPage: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: isDialogOpen, onClose: onDialogClose, onOpen: onDialogOpen } = useDisclosure();
  const [creditCardId, setCreditCardId] = useState<string>();

  const onSelected = (creditCard: CreditCard) => {
    setCreditCardId(creditCard.id);
    onOpen();
  };

  const onModalClose = () => {
    setCreditCardId(undefined);
    onClose();
  };

  const onDeleteOpen = (creditCard: CreditCard) => {
    setCreditCardId(creditCard.id);
    onDialogOpen();
  };

  const onDeleteClose = () => {
    setCreditCardId(undefined);
    onDialogClose();
  };

  console.log('CreditCardsPage rendering...');

  return (
    <>
      <Page metaTitle="Mis Tarjetas" title="Mis Tarjetas">
        <CreditCardsList onCreate={onOpen} onDelete={onDeleteOpen} onSelected={onSelected} />
        <Portal>
          {isOpen && (
            <CreditCardModalForm id={creditCardId} isOpen={isOpen} onClose={onModalClose} />
          )}
          {isDialogOpen && (
            <CreditCardDeleteDialog
              id={creditCardId}
              isOpen={isDialogOpen}
              onClose={onDeleteClose}
            />
          )}
        </Portal>
      </Page>
    </>
  );
};

export default CreditCardsPage;
