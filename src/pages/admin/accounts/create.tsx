import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useAccountRefresh } from '@api';
import { AccountModalForm } from '@containers';
import { useRouter } from '@hooks';

import { index } from './routes';

const CreatePage: React.FC = () => {
  const { navigate } = useRouter();
  const refresh = useAccountRefresh();

  const onConfirmed = () => {
    refresh();
    navigate(index);
  };

  const onDismiss = () => {
    navigate(index);
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
