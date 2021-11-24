import React from 'react';

import { Button, HStack } from '@chakra-ui/react';

import { TransactionPortalModal, TransactionsList } from '@containers';
import { Icon } from '@lib/chakra-ui';
import { Page } from '@lib/wal-ui';
import { TransactionType } from '@models';
import { useTransactionsStore } from '@stores';

const TransactionsPage: React.FC = () => {
  const [state, dispatch] = useTransactionsStore();

  return (
    <Page metaTitle="Movimientos" title="Movimientos">
      <HStack mb={2}>
        <Button
          aria-label="Nuevo gasto"
          colorScheme="red"
          leftIcon={<Icon icon="plus" />}
          onClick={() => dispatch.onOpenForm(TransactionType.Expense)}
          size="sm"
        >
          Nuevo Gasto
        </Button>
        <Button
          aria-label="Nuevo ingreso"
          colorScheme="green"
          leftIcon={<Icon icon="plus" />}
          onClick={() => dispatch.onOpenForm(TransactionType.Income)}
          size="sm"
        >
          Nuevo Ingreso
        </Button>
      </HStack>
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
