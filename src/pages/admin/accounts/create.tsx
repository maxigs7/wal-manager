import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useAccountListRefresh } from '@entities';
import { AccountModalForm } from '@features';

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
      <AccountModalForm isOpen={true} onConfirmed={onConfirmed} onDismiss={onDismiss} />
    </>
  );
};

export { CreatePage };
