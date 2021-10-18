// import React, { useEffect } from 'react';
import React from 'react';

import { AccountsList } from '@app/containers';
import { Page } from '@lib/wal-ui';

const AccountsPage: React.FC = () => {
  console.log('AccountsPage rendering...');

  return (
    <>
      <Page metaTitle="Mis Cuentas" title="Mis Cuentas">
        <AccountsList />
      </Page>
    </>
  );
};

export default AccountsPage;
