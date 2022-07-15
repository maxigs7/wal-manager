import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { Portal } from '@chakra-ui/react';

import { useLocationState } from '@lib';
import {
  TransactionModalFormContainer,
  useTransactionListRefresh,
  useTransactionStore,
} from '@m/transaction';
import { TransactionType } from '@models';

import { useTransactionNav } from './hooks';

interface IState {
  defaultDate?: Date;
}

const CreatePage: React.FC = () => {
  const { type } = useParams();
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
        <title>Crear Movimiento - WAL</title>
      </Helmet>
      <Portal>
        <TransactionModalFormContainer
          accountId={account?.id}
          date={defaultDate}
          isOpen={true}
          onConfirmed={onConfirmed}
          onDismiss={onDismiss}
          type={type as TransactionType}
        />
      </Portal>
    </>
  );
};

export { CreatePage };
