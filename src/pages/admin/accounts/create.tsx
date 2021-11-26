import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useAccountRefresh } from '@api';
import { AccountModalForm } from '@containers';
import { useAccountsNav } from '@routes';

const CreatePage: React.FC = () => {
  const { nav } = useAccountsNav();
  const refresh = useAccountRefresh();

  const onConfirmed = () => {
    refresh();
    onDismiss();
  };

  const onDismiss = () => {
    nav({ type: 'index', full: true });
  };

  return (
    <>
      <Helmet>
        <title>Crear Cuenta - WAL</title>
      </Helmet>
      <AccountModalForm isOpen={true} onConfirmed={onConfirmed} onDismiss={onDismiss} />
    </>
  );
};

export { CreatePage };
