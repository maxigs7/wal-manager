import React from 'react';
import { Outlet } from 'react-router-dom';

import { Portal } from '@chakra-ui/react';

import { CreditCardsList } from '@containers';
import { Page } from '@lib/wal-ui';

import { useNavigate, useRoutes } from './routes';

const CreditCardsPage: React.FC = () => {
  const { nav } = useNavigate();
  const routes = useRoutes();

  return (
    <>
      <Page metaTitle="Mis Tarjetas" title="Mis Tarjetas">
        <CreditCardsList
          onCreate={() => nav({ type: 'create' })}
          onDelete={(cc) => nav({ type: 'remove', id: cc.id })}
          onSelected={(cc) => nav({ type: 'edit', id: cc.id })}
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
