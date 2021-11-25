import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useCreditCardRefresh } from '@api';
import { CreditCardModalForm } from '@containers';

import { useNavigate } from './routes';

const CreatePage: React.FC = () => {
  const { nav } = useNavigate();
  const refresh = useCreditCardRefresh();

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
        <title>Crear Tarjeta - WAL</title>
      </Helmet>
      <CreditCardModalForm isOpen={true} onConfirmed={onConfirmed} onDismiss={onDismiss} />
    </>
  );
};

export { CreatePage };
