import React from 'react';

import { Portal } from '@chakra-ui/react';

import { CreditCard } from '@models';

import { CreditCardDeleteDialog, CreditCardModalForm } from '../';

const CreditCardPortalModal: React.FC<IProps> = ({
  id,
  isOpenForm,
  isOpenRemove,
  onConfirmed,
  onDismiss,
}) => {
  if (!isOpenForm && !isOpenRemove) {
    return null;
  }

  return (
    <Portal>
      {isOpenForm && (
        <CreditCardModalForm
          id={id}
          isOpen={isOpenForm}
          onConfirmed={onConfirmed}
          onDismiss={onDismiss}
        />
      )}
      {isOpenRemove && (
        <CreditCardDeleteDialog
          id={id}
          isOpen={isOpenRemove}
          onConfirmed={onConfirmed}
          onDismiss={onDismiss}
        />
      )}
    </Portal>
  );
};

interface IProps {
  id?: string;
  isOpenForm: boolean;
  isOpenRemove: boolean;
  onConfirmed(cc: CreditCard): void;
  onDismiss(): void;
}

export { CreditCardPortalModal };
