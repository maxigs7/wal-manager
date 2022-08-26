import React, { useCallback } from 'react';
import { Outlet } from 'react-router';

import { Button, Portal } from '@chakra-ui/react';

import { CreditCardTableContainer } from '@m/credit-card';
import { Card, ExpandableFilter, Icon, Page, useTextFilter, withTextFilter } from '@shared';

import { useCreditCardNav, useCreditCardRoutes } from './hooks';

const CreditCardsPage: React.FC = () => {
  const routes = useCreditCardRoutes();
  const [filters, dispatchFilters] = useTextFilter();
  const { goCreate, goRemove, goUpdate } = useCreditCardNav();

  const onCreate = useCallback(() => {
    goCreate();
  }, [goCreate]);

  const onUpdate = useCallback(
    (id: string) => {
      goUpdate(id);
    },
    [goUpdate],
  );

  const onRemove = useCallback(
    (id: string) => {
      goRemove(id);
    },
    [goRemove],
  );

  return (
    <Page metaTitle="Mis Tarjetas" title="Mis Tarjetas">
      <Card>
        <ExpandableFilter
          actions={
            <Button colorScheme="accent" leftIcon={<Icon icon="plus" />} onClick={onCreate}>
              Nuevo
            </Button>
          }
          onChangedText={dispatchFilters.onChangedText}
          text={filters.text}
        />
        <CreditCardTableContainer onRemove={onRemove} onUpdate={onUpdate} />
      </Card>

      {routes}

      <Portal>
        <Outlet />
      </Portal>
    </Page>
  );
};

export default withTextFilter(CreditCardsPage);
