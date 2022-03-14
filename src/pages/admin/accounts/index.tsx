import React, { useCallback } from 'react';
import { Outlet } from 'react-router';

import { Portal } from '@chakra-ui/react';

import { AccountListContainer } from '@m/account';
import { Account } from '@models';
import { Page } from '@shared';

import { useAccountNav, useAccountRoutes } from './hooks';

const AccountsPage: React.FC = () => {
  const routes = useAccountRoutes();
  const { goCreate, goRemove, goUpdate } = useAccountNav();

  const onCreate = useCallback(() => {
    goCreate();
  }, [goCreate]);

  const onUpdate = useCallback(
    (account: Account) => {
      goUpdate(account.id);
    },
    [goUpdate],
  );

  const onRemove = useCallback(
    (account: Account) => {
      goRemove(account.id);
    },
    [goRemove],
  );

  return (
    <Page metaTitle="Mis Cuentas" title="Mis Cuentas">
      <AccountListContainer onCreate={onCreate} onDelete={onRemove} onSelected={onUpdate} />

      {routes}

      <Portal>
        <Outlet />
      </Portal>
    </Page>
  );
};

export default AccountsPage;
