import React from 'react';
import { Helmet } from 'react-helmet-async';

import { TransactionType, useTransactionListRefresh } from '@entities';
import { TransactionModalForm } from '@features';
import { useRouter } from '@shared';

import { useTransactionNav } from './hooks';

const UpdatePage: React.FC = () => {
  const {
    params: { id, type },
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
        <title>Actualizar Movimiento - WAL</title>
      </Helmet>
      <TransactionModalForm
        id={id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
        type={type as TransactionType}
      />
    </>
  );
};

export { UpdatePage };
