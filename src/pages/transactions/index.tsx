import React, { useCallback } from 'react';
import { Outlet } from 'react-router-dom';

import { Button, HStack } from '@chakra-ui/react';

import { TransactionType } from '@entities';
import { TransactionSummary, TransactionTable, useTransactionStore } from '@features';
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
      goUpdate(id, new Date(state.year, state.month));
    },
    [goUpdate, state.year, state.month],
  );

  return (
    <Page metaTitle="Movimientos" title="Movimientos">
      <HStack mb={2}>
        <Button
          aria-label="Nuevo gasto"
          colorScheme="red"
          leftIcon={<Icon icon="plus" />}
          onClick={() => onCreate('expenses')}
          size="sm"
        >
          Nuevo Gasto
        </Button>
        <Button
          aria-label="Nuevo ingreso"
          colorScheme="green"
          leftIcon={<Icon icon="plus" />}
          onClick={() => onCreate('incomes')}
          size="sm"
        >
          Nuevo Ingreso
        </Button>
      </HStack>

      <Card>
        <YearBar currentYear={state.year} onUpdateYear={dispatch.onChangedYear} />
        <MonthTabs currentMonth={state.month} onUpdateMonth={dispatch.onChangedMonth} />
        <TransactionSummary endDate={state.endDate} startDate={state.startDate} />
        <TransactionTable
          endDate={state.endDate}
          onRemove={onRemove}
          onUpdate={onUpdate}
          startDate={state.startDate}
        />
      </Card>

      {routes}

      <Outlet />
    </Page>
  );
};

export default TransactionsPage;
