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
  const { goCreate, goRemove } = useTransactionNav();

  const onCreate = useCallback(
    (type: TransactionType) => {
      goCreate(type);
    },
    [goCreate],
  );

  const onRemove = useCallback(
    (id: string) => {
      goRemove(id);
    },
    [goRemove],
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
        <TransactionTable month={state.month} onRemove={onRemove} year={state.year} />
      </Card>

      {routes}

      <Outlet />
    </Page>
  );
};

export default TransactionsPage;
