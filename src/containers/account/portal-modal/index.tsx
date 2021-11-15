import React from 'react';

import { Portal } from '@chakra-ui/react';

import { Account } from '@models';

import { AccountDeleteDialog, AccountModalForm } from '../';

const AccountPortalModal: React.FC<IProps> = ({
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
        <AccountModalForm
          id={id}
          isOpen={isOpenForm}
          onConfirmed={onConfirmed}
          onDismiss={onDismiss}
        />
      )}
      {isOpenRemove && (
        <AccountDeleteDialog
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
  onConfirmed(account: Account): void;
  onDismiss(): void;
}

export { AccountPortalModal };
