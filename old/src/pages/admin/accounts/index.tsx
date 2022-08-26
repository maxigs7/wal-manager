import React, { useCallback } from 'react';
import { Outlet } from 'react-router';

import { Button, Portal } from '@chakra-ui/react';

import { AccountTableContainer } from '@m/account';
import { Card, ExpandableFilter, Icon, Page, useTextFilter, withTextFilter } from '@shared';

import { useAccountNav, useAccountRoutes } from './hooks';

const AccountsPage: React.FC = () => {
  const routes = useAccountRoutes();
  const [filters, dispatchFilters] = useTextFilter();
  const { goCreate, goRemove, goUpdate } = useAccountNav();

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
    <Page metaTitle="Mis Cuentas" title="Mis Cuentas">
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
        <AccountTableContainer onRemove={onRemove} onUpdate={onUpdate} />
      </Card>

      {routes}

      <Portal>
        <Outlet />
      </Portal>
    </Page>
  );
};

export default withTextFilter(AccountsPage);
