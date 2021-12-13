import React from 'react';
import { Helmet } from 'react-helmet-async';

import { CreditCard, useCreditCardListRefresh } from '@entities';
import { CreditCardModalForm } from '@features';
import { useRouter } from '@shared';

import { useCreditCardNav } from './hooks';

const UpdatePage: React.FC = () => {
  const {
    params: { id },
  } = useRouter();
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
      <CreditCardModalForm id={id} isOpen={true} onConfirmed={onConfirmed} onDismiss={onDismiss} />
    </>
  );
};

export { UpdatePage };
