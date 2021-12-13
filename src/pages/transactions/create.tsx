import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Portal } from '@chakra-ui/react';

import { TransactionType, useTransactionListRefresh } from '@entities';
import { TransactionModalForm } from '@features';
import { useRouter } from '@shared';

import { useTransactionNav } from './hooks';

const CreatePage: React.FC = () => {
  const {
    params: { type },
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
        <TransactionModalForm
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
