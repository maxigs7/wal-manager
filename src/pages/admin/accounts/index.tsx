import React from 'react';
import { Outlet } from 'react-router';

import { Portal } from '@chakra-ui/react';

import { AccountsList } from '@containers';
import { useRouter } from '@hooks';
import { Page } from '@lib/wal-ui';

import { create, edit, remove, useRoutes } from './routes';

const AccountsPage: React.FC = () => {
  const { navigate } = useRouter();
  const routes = useRoutes();

  return (
    <>
      <Page metaTitle="Mis Cuentas" title="Mis Cuentas">
        <AccountsList
          onCreate={() => navigate(create)}
          onDelete={(account) => navigate(remove(account.id))}
          onSelected={(account) => navigate(edit(account.id))}
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
