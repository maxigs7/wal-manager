import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useTransactionListRefresh } from '@entities';
import { TransactionDialogRemove } from '@features';
import { useRouter } from '@shared';

import { useTransactionNav } from './hooks';

const RemovePage: React.FC = () => {
  const {
    params: { id },
  } = useRouter();
  const { goIndex } = useTransactionNav();
  const refresh = useTransactionListRefresh();

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
        <title>Eliminar Movimiento - WAL</title>
      </Helmet>
      <TransactionDialogRemove
        id={id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
      />
    </>
  );
};

export { RemovePage };
