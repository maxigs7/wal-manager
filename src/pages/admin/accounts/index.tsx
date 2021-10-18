// import React, { useEffect } from 'react';
import React, { useEffect, useState } from 'react';

import { useDisclosure } from '@chakra-ui/hooks';
import { Portal } from '@chakra-ui/portal';

import { AccountsList, AccountModalForm, AccountDeleteDialog } from '@app/containers';
import { useAppSelector } from '@app/hooks';
import { Account } from '@app/models/accounts';
import { selectSelected } from '@app/stores/accounts';
import { Page } from '@lib/wal-ui';

const AccountsPage: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: isDialogOpen, onClose: onDialogClose, onOpen: onDialogOpen } = useDisclosure();
  const [accountId, setAccountId] = useState<string>();
  const selected = useAppSelector(selectSelected);

  const onDeleteOpen = (account: Account) => {
    setAccountId(account.id);
    onDialogOpen();
  };

  const onDeleteClose = () => {
    setAccountId(undefined);
    onDialogClose();
  };

  useEffect(() => {
    if (selected) {
      onOpen();
    }
  }, [selected]);

  console.log('AccountsPage rendering...');

  return (
    <>
      <Page metaTitle="Mis Cuentas" title="Mis Cuentas">
        <AccountsList onCreate={onOpen} onDelete={onDeleteOpen} />
        <Portal>
          {isOpen && <AccountModalForm id={selected?.id} isOpen={isOpen} onClose={onClose} />}
          {isDialogOpen && (
            <AccountDeleteDialog id={accountId} isOpen={isDialogOpen} onClose={onDeleteClose} />
          )}
        </Portal>
      </Page>
    </>
  );
};

export default AccountsPage;
