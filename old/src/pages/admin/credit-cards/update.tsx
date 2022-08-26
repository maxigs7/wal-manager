import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { CreditCardModalFormContainer, useCreditCardListRefresh } from '@m/credit-card';
import { CreditCard } from '@models';

import { useCreditCardNav } from './hooks';

const UpdatePage: React.FC = () => {
  const { id } = useParams();
  const { goIndex } = useCreditCardNav();
  const refresh = useCreditCardListRefresh();

  const onConfirmed = (creditCard: CreditCard) => {
    refresh(creditCard.id);
    onDismiss();
  };

  const onDismiss = () => {
    goIndex();
  };

  return (
    <>
      <Helmet>
        <title>Actualizar Cuenta - WAL</title>
      </Helmet>
      <CreditCardModalFormContainer
        id={id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
      />
    </>
  );
};

export { UpdatePage };
