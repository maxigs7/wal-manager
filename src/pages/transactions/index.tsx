import React, { useCallback } from 'react';
import { Outlet } from 'react-router-dom';

import { Button, HStack } from '@chakra-ui/react';

import { TransactionType } from '@entities';
import { TransactionTable, useTransactionStore } from '@features';
import { Card, Icon, MonthTabs, Page, YearBar } from '@shared';

import { useTransactionNav, useTransactionRoutes } from './hooks';

const TransactionsPage: React.FC = () => {
  const [state, dispatch] = useTransactionStore();
  const routes = useTransactionRoutes();
  const { goCreate, goRemove, goUpdate } = useTransactionNav();

  const onCreate = useCallback(
    (type: TransactionType) => {
      goCreate(type, new Date(state.year, state.month));
    },
    [goCreate, state.year, state.month],
  );

  const onRemove = useCallback(
    (id: string) => {
      goRemove(id);
    },
    [goRemove],
  );

  const onUpdate = useCallback(
    (id: string) => {
      goUpdate(id);
    },
    [goUpdate],
  );

  return (
    <Page metaTitle="Movimientos" title="Movimientos">
      <HStack mb={2}>
        <Button
          aria-label="Nuevo gasto"
          colorScheme="red"
          leftIcon={<Icon icon="plus" />}
          onClick={() => onCreate(TransactionType.Expense)}
          size="sm"
        >
          Nuevo Gasto
        </Button>
        <Button
          aria-label="Nuevo ingreso"
          colorScheme="green"
          leftIcon={<Icon icon="plus" />}
          onClick={() => onCreate(TransactionType.Income)}
          size="sm"
        >
          Nuevo Ingreso
        </Button>
      </HStack>

      <Card>
        <YearBar currentYear={state.year} onUpdateYear={dispatch.onChangedYear} />
        <MonthTabs currentMonth={state.month} onUpdateMonth={dispatch.onChangedMonth} />
        <TransactionTable
          month={state.month}
          onRemove={onRemove}
          onUpdate={onUpdate}
          year={state.year}
        />
      </Card>

      {routes}

      <Outlet />
    </Page>
  );
};

export default TransactionsPage;
