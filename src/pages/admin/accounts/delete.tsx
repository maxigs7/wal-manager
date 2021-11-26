import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useAccountRefresh } from '@api';
import { AccountDeleteDialog } from '@containers';
import { useRouter } from '@hooks';
import { Account } from '@models';
import { useAccountsNav } from '@routes';

const DeletePage: React.FC = () => {
  const { params } = useRouter();
  const { nav } = useAccountsNav();
  const refresh = useAccountRefresh();

  const onConfirmed = (account: Account) => {
    refresh(account.id);
    onDismiss();
  };

  const onDismiss = () => {
    nav({ type: 'index', full: true });
  };

  return (
    <>
      <Helmet>
        <title>Eliminar Cuenta - WAL</title>
      </Helmet>
      <AccountDeleteDialog
        id={params.id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
      />
    </>
  );
};

export { DeletePage };
