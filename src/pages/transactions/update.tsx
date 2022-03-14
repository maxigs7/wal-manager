import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useRouter } from '@lib';
import { TransactionModalFormContainer, useTransactionListRefresh } from '@m/transaction';
import { TransactionType } from '@models';

import { useTransactionNav } from './hooks';

const UpdatePage: React.FC = () => {
  const {
    params: { id, type },
    state: { defaultDate },
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
      <TransactionModalFormContainer
        date={defaultDate}
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
