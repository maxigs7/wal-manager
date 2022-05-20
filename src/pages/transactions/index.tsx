import React, { useCallback, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Flex, HStack } from '@chakra-ui/react';

import {
  CreateTransactionButtonContainer,
  TransactionSummaryContainer,
  TransactionTableContainer,
  useTransactionStore,
} from '@m/transaction';
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
        <CreateTransactionButtonContainer
          goCreate={goCreate}
          icon="plus"
          label="Nuevo gasto"
          type="expenses"
        />
        <CreateTransactionButtonContainer
          goCreate={goCreate}
          icon="plus"
          label="Nuevo ingreso"
          type="incomes"
        />
      </HStack>

      <Flex direction={{ base: 'column', md: 'row' }}>
        <Card>
          <YearBar currentYear={state.year} onUpdateYear={dispatch.onChangedYear} />
          <MonthTabs currentMonth={state.month} onUpdateMonth={dispatch.onChangedMonth} />
          <TransactionTableContainer
            endDate={state.endDate}
            onMoreActions={onMoreActions}
            onRemove={onRemove}
            onUpdate={onUpdate}
            startDate={state.startDate}
          />
        </Card>

        <TransactionSummaryContainer
          direction={{ base: 'column', sm: 'row', md: 'column' }}
          endDate={state.endDate}
          mb={{ base: 2, md: 0 }}
          ml={{ base: 0, md: 2 }}
          order={{ base: -1, md: 'initial' }}
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
