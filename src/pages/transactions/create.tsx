import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Portal } from '@chakra-ui/react';

import { useRouter } from '@lib';
import { TransactionModalFormContainer, useTransactionListRefresh } from '@m/transaction';
import { TransactionType } from '@models';

import { useTransactionNav } from './hooks';

const CreatePage: React.FC = () => {
  const {
    params: { type },
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
        <title>Crear Movimiento - WAL</title>
      </Helmet>
      <Portal>
        <TransactionModalFormContainer
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
