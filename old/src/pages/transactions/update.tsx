import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { useLocationState } from '@lib';
import {
  TransactionModalFormContainer,
  useTransactionListRefresh,
  useTransactionStore,
} from '@m/transaction';
import { TransactionType } from '@models';

import { useTransactionNav } from './hooks';

interface IState {
  defaultDate?: Date | undefined;
}

const UpdatePage: React.FC = () => {
  const { id, type } = useParams();
  const { defaultDate } = useLocationState<IState>() || {};
  const [{ account }] = useTransactionStore();

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
        accountId={account?.id}
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
