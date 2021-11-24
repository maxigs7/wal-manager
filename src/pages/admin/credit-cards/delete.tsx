import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useCreditCardRefresh } from '@api';
import { CreditCardDeleteDialog } from '@containers';
import { useRouter } from '@hooks';
import { CreditCard } from '@models';

import { index } from './routes';

const DeletePage: React.FC = () => {
  const { navigate, params } = useRouter();
  const refresh = useCreditCardRefresh();

  const onConfirmed = (cc: CreditCard) => {
    refresh(cc.id);
    navigate(index);
  };

  const onDismiss = () => {
    navigate(index);
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
