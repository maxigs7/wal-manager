import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useRouter } from '@lib';
import { useTransactionListRefresh, TransactionModalFormContainer } from '@m/transaction';
import { TransactionType } from '@models';

import { useTransactionNav } from './hooks';

const ClonePage: React.FC = () => {
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
        <title>Clonar Movimiento - WAL</title>
      </Helmet>
      <TransactionModalFormContainer
        id={id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
        type={type as TransactionType}
      />
    </>
  );
};

export { ClonePage };
