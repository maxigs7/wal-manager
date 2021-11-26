import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useCreditCardRefresh } from '@api';
import { CreditCardDeleteDialog } from '@containers';
import { useRouter } from '@hooks';
import { CreditCard } from '@models';
import { useCreditCardsNav } from '@routes';

const DeletePage: React.FC = () => {
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
        <title>Eliminar Tarjeta - WAL</title>
      </Helmet>
      <CreditCardDeleteDialog
        id={params.id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
      />
    </>
  );
};

export { DeletePage };
