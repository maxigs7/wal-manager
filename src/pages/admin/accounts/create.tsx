import React from 'react';
import { Helmet } from 'react-helmet-async';

import { AccountModalFormContainer, useAccountListRefresh } from '@m/account';

import { useAccountNav } from './hooks';

const CreatePage: React.FC = () => {
  const { goIndex } = useAccountNav();
  const refresh = useAccountListRefresh();

  const onConfirmed = () => {
    refresh();
    onDismiss();
  };

  const onDismiss = () => {
    goIndex();
  };

  return (
    <>
      <Helmet>
        <title>Crear Cuenta - WAL</title>
      </Helmet>
      <AccountModalFormContainer isOpen={true} onConfirmed={onConfirmed} onDismiss={onDismiss} />
    </>
  );
};

export { CreatePage };
