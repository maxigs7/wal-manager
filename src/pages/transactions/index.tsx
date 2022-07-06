import React, { useCallback, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Flex, Portal, Stack } from '@chakra-ui/react';

import { AccountSelectContainer } from '@m/account';
import {
  CreateTransactionButtonContainer,
  TransactionSummaryContainer,
  TransactionTableContainer,
  useTransactionStore,
} from '@m/transaction';
import {
  ActionsDrawer,
  Card,
  IActionDrawer,
  MonthTabs,
  Page,
  usePagePortals,
  YearBar,
} from '@shared';

import { withTransactionStore } from './hocs/withProvider';
import { useTransactionNav, useTransactionRoutes } from './hooks';

const TransactionsPage: React.FC = () => {
  const { titleBoxRef } = usePagePortals();
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
    <Page metaTitle="Movimientos">
      <Portal containerRef={titleBoxRef}>
        <Stack direction={{ base: 'column', md: 'row' }} gap="2" mb="3">
          <Box minW={['full', 'full', '96']}>
            <AccountSelectContainer
              name="accountSelectedId"
              onChange={dispatch.onChangedAccount}
              value={state.accountId}
            />
          </Box>
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
        </Stack>
        <TransactionSummaryContainer
          accountId={state.accountId}
          endDate={state.endDate}
          startDate={state.startDate}
        />
      </Portal>

      <Card>
        <YearBar currentYear={state.year} onUpdateYear={dispatch.onChangedYear} />
        <MonthTabs currentMonth={state.month} onUpdateMonth={dispatch.onChangedMonth} />
        <TransactionTableContainer
          accountId={state.accountId}
          endDate={state.endDate}
          onMoreActions={onMoreActions}
          onRemove={onRemove}
          onUpdate={onUpdate}
          startDate={state.startDate}
        />
      </Card>

      {routes}

      <Outlet />

      <ActionsDrawer actions={actions} isOpen={!!currentActionId} onClose={onCloseDrawer} />
    </Page>
  );
};

export default withTransactionStore(TransactionsPage);
