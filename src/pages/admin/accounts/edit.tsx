import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useAccountRefresh } from '@api';
import { AccountModalForm } from '@containers';
import { useRouter } from '@hooks';
import { Account } from '@models';

import { index } from './routes';

const EditPage: React.FC = () => {
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
        <title>Editar Cuenta - WAL</title>
      </Helmet>
      <AccountModalForm
        id={params.id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
      />
    </>
  );
};

export { EditPage };
