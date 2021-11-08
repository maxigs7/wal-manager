import React, { useState } from 'react';

import { useDisclosure } from '@chakra-ui/hooks';
import { Portal } from '@chakra-ui/portal';

import { AccountsList, AccountModalForm, AccountDeleteDialog } from '@containers';
import { Page } from '@lib/wal-ui';
import { Account } from '@models/accounts';

const AccountsPage: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: isDialogOpen, onClose: onDialogClose, onOpen: onDialogOpen } = useDisclosure();
  const [accountId, setAccountId] = useState<string>();

  const onSelected = (account: Account) => {
    setAccountId(account.id);
    onOpen();
  };

  const onModalClose = () => {
    setAccountId(undefined);
    onClose();
  };

  const onDeleteOpen = (account: Account) => {
    setAccountId(account.id);
    onDialogOpen();
  };

  const onDeleteClose = () => {
    setAccountId(undefined);
    onDialogClose();
  };

  console.log('AccountsPage rendering...');

  return (
    <>
      <Page metaTitle="Mis Cuentas" title="Mis Cuentas">
        <AccountsList onCreate={onOpen} onDelete={onDeleteOpen} onSelected={onSelected} />
        <Portal>
          {isOpen && <AccountModalForm id={accountId} isOpen={isOpen} onClose={onModalClose} />}
          {isDialogOpen && (
            <AccountDeleteDialog id={accountId} isOpen={isDialogOpen} onClose={onDeleteClose} />
          )}
        </Portal>
      </Page>
    </>
  );
};

export default AccountsPage;
