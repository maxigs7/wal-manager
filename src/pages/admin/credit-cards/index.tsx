import React, { useEffect, useState } from 'react';

import { useDisclosure } from '@chakra-ui/hooks';
import { Portal } from '@chakra-ui/portal';

import { CreditCardDeleteDialog, CreditCardModalForm, CreditCardsList } from '@app/containers';
import { useAppSelector } from '@app/hooks';
import { CreditCard } from '@app/models/credit-cards';
import { selectSelected } from '@app/stores/credit-cards';
import { Page } from '@lib/wal-ui';

const CreditCardsPage: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: isDialogOpen, onClose: onDialogClose, onOpen: onDialogOpen } = useDisclosure();
  const [creditCardId, setCreditCardId] = useState<string>();
  const selected = useAppSelector(selectSelected);

  const onDeleteOpen = (creditCard: CreditCard) => {
    setCreditCardId(creditCard.id);
    onDialogOpen();
  };

  const onDeleteClose = () => {
    setCreditCardId(undefined);
    onDialogClose();
  };

  useEffect(() => {
    if (selected) {
      onOpen();
    }
  }, [selected]);

  console.log('CreditCardsPage rendering...');

  return (
    <>
      <Page metaTitle="Mis Tarjetas" title="Mis Tarjetas">
        <CreditCardsList onCreate={onOpen} onDelete={onDeleteOpen} />
        <Portal>
          {isOpen && <CreditCardModalForm id={selected?.id} isOpen={isOpen} onClose={onClose} />}
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
