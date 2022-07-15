import React, { useCallback, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Flex, Portal, VStack } from '@chakra-ui/react';
import compose from 'compose-function';

import { withDolarsi } from '@api';
import {
  TransactionBalanceSummaryContainer,
  TransactionCreditCardSummaryContainer,
  TransactionExtraFilter,
  TransactionMainFilterActions,
  TransactionTableContainer,
  useCreditCardSummary,
  useTransactionStore,
  withTransactionStore,
} from '@m/transaction';
import { ActionsDrawer, Card, IActionDrawer, Page, usePagePortals, withTextFilter } from '@shared';

import { useTransactionNav, useTransactionRoutes } from './hooks';

const TransactionsPage: React.FC = () => {
  const { titleBoxRef } = usePagePortals();
  const [state] = useTransactionStore();
  const routes = useTransactionRoutes();
  const { goCreate, goRemove, goUpdate } = useTransactionNav();
  const [currentActionId, setCurrentActionId] = useState<string>();

  const { data: creditCards } = useCreditCardSummary(
    state.account?.id,
    state.startDate,
    state.endDate,
  );
  const hasCreditCards = useMemo(() => !!creditCards?.length, [creditCards]);

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
        <TransactionMainFilterActions goCreate={goCreate} mb="3" />
        <TransactionExtraFilter />
        <TransactionBalanceSummaryContainer />
      </Portal>

      <Flex flexDirection={['column-reverse', null, 'row']} gap="3">
        <Card w="100%">
          <TransactionTableContainer
            onMoreActions={onMoreActions}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        </Card>
        {hasCreditCards && (
          <VStack flexBasis={['100%', null, '20%']} spacing="3">
            <TransactionCreditCardSummaryContainer />
          </VStack>
        )}
      </Flex>
      {routes}

      <Outlet />

      <ActionsDrawer actions={actions} isOpen={!!currentActionId} onClose={onCloseDrawer} />
    </Page>
  );
};

export default compose(withTextFilter, withDolarsi, withTransactionStore)(TransactionsPage);
