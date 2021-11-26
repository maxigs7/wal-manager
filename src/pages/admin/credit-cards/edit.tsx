import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useCreditCardRefresh } from '@api';
import { CreditCardModalForm } from '@containers';
import { useRouter } from '@hooks';
import { CreditCard } from '@models';
import { useCreditCardsNav } from '@routes';

const EditPage: React.FC = () => {
  const { params } = useRouter();
  const { nav } = useCreditCardsNav();
  const refresh = useCreditCardRefresh();

  const onConfirmed = (account: CreditCard) => {
    refresh(account.id);
    onDismiss();
  };

  const onDismiss = () => {
    nav({ type: 'index', full: true });
  };

  return (
    <>
      <Helmet>
        <title>Editar Tarjeta - WAL</title>
      </Helmet>
      <CreditCardModalForm
        id={params.id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
      />
    </>
  );
};

export { EditPage };
