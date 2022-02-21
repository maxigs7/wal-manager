import React, { useCallback, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Button, HStack } from '@chakra-ui/react';

import { TransactionType } from '@entities';
import { TransactionSummary, TransactionTable, useTransactionStore } from '@features';
import { ActionsDrawer, Card, IActionDrawer, Icon, MonthTabs, Page, YearBar } from '@shared';

import { useTransactionNav, useTransactionRoutes } from './hooks';

const TransactionsPage: React.FC = () => {
  const [state, dispatch] = useTransactionStore();
  const routes = useTransactionRoutes();
  const { goCreate, goRemove, goUpdate } = useTransactionNav();
  const [currentActionId, setCurrentActionId] = useState<string>();

  const onCreate = useCallback(
    (type: TransactionType) => {
      goCreate(type, new Date(state.year, state.month));
    },
    [goCreate, state.year, state.month],
  );

  const onMoreActions = useCallback((id: string) => {
    setCurrentActionId(id);
  }, []);

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

  const actions: IActionDrawer[] = useMemo(
    () => [
      {
        colorScheme: 'primary',
        label: 'Modificar',
        icon: 'edit',
        onClick: () => onUpdate(currentActionId as string),
      },
      {
        colorScheme: 'danger',
        label: 'Eliminar',
        icon: 'trash-alt',
        onClick: () => onRemove(currentActionId as string),
      },
    ],
    [currentActionId],
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
          onMoreActions={onMoreActions}
          onRemove={onRemove}
          onUpdate={onUpdate}
          startDate={state.startDate}
        />
      </Card>

      {routes}

      <Outlet />

      <ActionsDrawer
        actions={actions}
        isOpen={!!currentActionId}
        onClose={() => setCurrentActionId(undefined)}
      />
    </Page>
  );
};

export default TransactionsPage;
