import React from 'react';
import { Outlet } from 'react-router-dom';

import { Portal } from '@chakra-ui/react';

import { CreditCardsList } from '@containers';
import { useRouter } from '@hooks';
import { Page } from '@lib/wal-ui';

import { create, edit, remove, useRoutes } from './routes';

const CreditCardsPage: React.FC = () => {
  const { navigate } = useRouter();
  const routes = useRoutes();

  return (
    <>
      <Page metaTitle="Mis Tarjetas" title="Mis Tarjetas">
        <CreditCardsList
          onCreate={() => navigate(create)}
          onDelete={(cc) => navigate(remove(cc.id))}
          onSelected={(cc) => navigate(edit(cc.id))}
        />

        {routes}

        <Portal>
          <Outlet />
        </Portal>
      </Page>
    </>
  );
};

export default CreditCardsPage;
