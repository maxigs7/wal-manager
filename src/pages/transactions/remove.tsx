import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { useTransactionListRefresh, TransactionDialogRemoveContainer } from '@m/transaction';

import { useTransactionNav } from './hooks';

const RemovePage: React.FC = () => {
  const { id } = useParams();
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
      <TransactionDialogRemoveContainer
        id={id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
      />
    </>
  );
};

export { RemovePage };
