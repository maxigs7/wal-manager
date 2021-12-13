import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useCreditCardListRefresh } from '@entities';
import { CreditCardModalForm } from '@features';

import { useCreditCardNav } from './hooks';

const CreatePage: React.FC = () => {
  const { goIndex } = useCreditCardNav();
  const refresh = useCreditCardListRefresh();

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
        <title>Crear Tarjeta - WAL</title>
      </Helmet>
      <CreditCardModalForm isOpen={true} onConfirmed={onConfirmed} onDismiss={onDismiss} />
    </>
  );
};

export { CreatePage };
