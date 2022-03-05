import React, { useCallback, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Flex, HStack, useWhyDidYouUpdate } from '@chakra-ui/react';

import { useTransactionStore } from '@entities';
import { CreateTransactionButton, TransactionSummary, TransactionTable } from '@features';
import { ActionsDrawer, Card, IActionDrawer, MonthTabs, Page, YearBar } from '@shared';

import { withTransactionStore } from './hocs/withProvider';
import { useTransactionNav, useTransactionRoutes } from './hooks';

const TransactionsPage: React.FC = () => {
  const [state, dispatch] = useTransactionStore();
  const routes = useTransactionRoutes();
  const { goCreate, goRemove, goUpdate } = useTransactionNav();
  const [currentActionId, setCurrentActionId] = useState<string>();

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

  const onCloseDrawer = useCallback(() => {
    setCurrentActionId(undefined);
  }, []);

  return (
    <Page metaTitle="Movimientos" title="Movimientos">
      <HStack mb="2">
        <CreateTransactionButton
          goCreate={goCreate}
          icon="plus"
          label="Nuevo gasto"
          type="expenses"
        />
        <CreateTransactionButton
          goCreate={goCreate}
          icon="plus"
          label="Nuevo ingreso"
          type="incomes"
        />
      </HStack>

      <Flex flexDirection={['column', 'row']}>
        <Card>
          <YearBar currentYear={state.year} onUpdateYear={dispatch.onChangedYear} />
          <MonthTabs currentMonth={state.month} onUpdateMonth={dispatch.onChangedMonth} />
          <TransactionTable
            endDate={state.endDate}
            onMoreActions={onMoreActions}
            onRemove={onRemove}
            onUpdate={onUpdate}
            startDate={state.startDate}
          />
        </Card>

        <TransactionSummary
          endDate={state.endDate}
          mb={['2', '0']}
          ml={['0', '2']}
          order={[-1, 'initial']}
          startDate={state.startDate}
          textAlign={['center', 'left']}
        />
      </Flex>

      {routes}

      <Outlet />

      <ActionsDrawer actions={actions} isOpen={!!currentActionId} onClose={onCloseDrawer} />
    </Page>
  );
};

export default withTransactionStore(TransactionsPage);
