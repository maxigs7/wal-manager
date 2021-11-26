import React from 'react';
import { Outlet } from 'react-router';

import { Portal } from '@chakra-ui/react';

import { AccountsList } from '@containers';
import { Page } from '@lib/wal-ui';
import { useAccountsNav, useAccountsRoutes } from '@routes';

const AccountsPage: React.FC = () => {
  const { nav } = useAccountsNav();
  const routes = useAccountsRoutes();

  return (
    <>
      <Page metaTitle="Mis Cuentas" title="Mis Cuentas">
        <AccountsList
          onCreate={() => nav({ type: 'create' })}
          onDelete={(account) => nav({ type: 'remove', id: account.id })}
          onSelected={(account) => nav({ type: 'edit', id: account.id })}
        />

        {routes}

        <Portal>
          <Outlet />
        </Portal>
      </Page>
    </>
  );
};

export default AccountsPage;
