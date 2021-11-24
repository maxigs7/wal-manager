import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useAccountRefresh } from '@api';
import { AccountDeleteDialog } from '@containers';
import { useRouter } from '@hooks';
import { Account } from '@models';

import { index } from './routes';

const DeletePage: React.FC = () => {
  const { navigate, params } = useRouter();
  const refresh = useAccountRefresh();

  const onConfirmed = (account: Account) => {
    refresh(account.id);
    navigate(index);
  };

  const onDismiss = () => {
    navigate(index);
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
