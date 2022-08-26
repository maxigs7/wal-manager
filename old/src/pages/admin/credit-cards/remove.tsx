import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { CreditCardDialogRemoveContainer, useCreditCardListRefresh } from '@m/credit-card';
import { CreditCard } from '@models';

import { useCreditCardNav } from './hooks';

const RemovePage: React.FC = () => {
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
        <title>Eliminar Cuenta - WAL</title>
      </Helmet>
      <CreditCardDialogRemoveContainer
        id={id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
      />
    </>
  );
};

export { RemovePage };
