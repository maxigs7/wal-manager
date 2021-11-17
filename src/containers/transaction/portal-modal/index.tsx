import React from 'react';

import { Portal } from '@chakra-ui/react';

import { Transaction, TransactionType } from '@models';

import { TransactionDeleteDialog, TransactionModalCreateForm } from '../';

const TransactionPortalModal: React.FC<IProps> = ({
  id,
  isOpenForm,
  isOpenRemove,
  onConfirmed,
  onDismiss,
  type,
}) => {
  if (!isOpenForm && !isOpenRemove) {
    return null;
  }

  return (
    <Portal>
      {isOpenForm && type && (
        <TransactionModalCreateForm
          isOpen={isOpenForm}
          onConfirmed={onConfirmed}
          onDismiss={onDismiss}
          type={type}
        />
      )}
      {isOpenRemove && (
        <TransactionDeleteDialog
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
  onConfirmed(transaction: Transaction): void;
  onDismiss(): void;
  type?: TransactionType;
}

export { TransactionPortalModal };
