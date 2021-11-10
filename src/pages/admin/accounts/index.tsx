import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/hooks';
import { Portal } from '@chakra-ui/portal';

import { AccountsList, AccountModalForm, AccountDeleteDialog } from '@containers';
import { Page } from '@lib/wal-ui';
import { Account } from '@models';

const AccountsPage: React.FC = () => {
  const { isOpen: isOpenForm, onClose: onDismissForm, onOpen: onOpenForm } = useDisclosure();
  const { isOpen: isOpenRemove, onClose: onDismissRemove, onOpen: _onOpenRemove } = useDisclosure();
  const [accountId, setAccountId] = useState<string>();

  const onSelected = (account: Account) => {
    setAccountId(account.id);
    onOpenForm();
  };

  const onConfirmedForm = () => {
    setAccountId(undefined);
    onDismissForm();
  };

  const onOpenRemove = (account: Account) => {
    setAccountId(account.id);
    _onOpenRemove();
  };

  const onConfirmedRemove = () => {
    setAccountId(undefined);
    onDismissRemove();
  };

  console.log('AccountsPage rendering...');

  return (
    <>
      <Page metaTitle="Mis Cuentas" title="Mis Cuentas">
        <AccountsList onCreate={onOpenForm} onDelete={onOpenRemove} onSelected={onSelected} />
        <Portal>
          {isOpenForm && (
            <AccountModalForm
              id={accountId}
              isOpen={isOpenForm}
              onConfirmed={onConfirmedForm}
              onDismiss={onDismissForm}
            />
          )}
          {isOpenRemove && (
            <AccountDeleteDialog
              id={accountId}
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

export default AccountsPage;
