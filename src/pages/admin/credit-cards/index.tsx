import React, { useCallback } from 'react';
import { Outlet } from 'react-router';

import { Portal } from '@chakra-ui/react';

import { CreditCardListContainer } from '@m/credit-card';
import { CreditCard } from '@models';
import { Page } from '@shared';

import { useCreditCardNav, useCreditCardRoutes } from './hooks';

const CreditCardsPage: React.FC = () => {
  const routes = useCreditCardRoutes();
  const { goCreate, goRemove, goUpdate } = useCreditCardNav();

  const onCreate = useCallback(() => {
    goCreate();
  }, [goCreate]);

  const onUpdate = useCallback(
    (creditCard: CreditCard) => {
      goUpdate(creditCard.id);
    },
    [goUpdate],
  );

  const onRemove = useCallback(
    (creditCard: CreditCard) => {
      goRemove(creditCard.id);
    },
    [goRemove],
  );

  return (
    <Page metaTitle="Mis Tarjetas" title="Mis Tarjetas">
      <CreditCardListContainer onCreate={onCreate} onDelete={onRemove} onSelected={onUpdate} />

      {routes}

      <Portal>
        <Outlet />
      </Portal>
    </Page>
  );
};

export default CreditCardsPage;
