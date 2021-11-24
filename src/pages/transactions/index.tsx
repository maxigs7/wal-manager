import React from 'react';

import { Button } from '@chakra-ui/react';

import { TransactionPortalModal, TransactionsList } from '@containers';
import { Page } from '@lib/wal-ui';
import { TransactionType } from '@models';
import { useTransactionsStore } from '@stores';

const TransactionsPage: React.FC = () => {
  const [state, dispatch] = useTransactionsStore();

  return (
    <Page metaTitle="Movimientos" title="Movimientos">
      <Button onClick={() => dispatch.onOpenForm(TransactionType.Income)}>Nuevo Ingreso</Button>
      <Button onClick={() => dispatch.onOpenForm(TransactionType.Expense)}>Nuevo Gasto</Button>
      <TransactionPortalModal
        isOpenForm={state.isOpenForm}
        isOpenRemove={state.isOpenRemove}
        onConfirmed={dispatch.onConfirmedForm}
        onDismiss={dispatch.onDismissForm}
        type={state.selectedType}
      />

      <TransactionsList
        month={state.month}
        setMonth={dispatch.onChangedMonth}
        setYear={dispatch.onChangedYear}
        year={state.year}
      />
    </Page>
  );
};

export default TransactionsPage;
