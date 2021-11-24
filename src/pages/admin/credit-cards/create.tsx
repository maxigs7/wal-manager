import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useCreditCardRefresh } from '@api';
import { CreditCardModalForm } from '@containers';
import { useRouter } from '@hooks';

import { index } from './routes';

const CreatePage: React.FC = () => {
  const { navigate } = useRouter();
  const refresh = useCreditCardRefresh();

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
        <title>Crear Tarjeta - WAL</title>
      </Helmet>
      <CreditCardModalForm isOpen={true} onConfirmed={onConfirmed} onDismiss={onDismiss} />
    </>
  );
};

export { CreatePage };
