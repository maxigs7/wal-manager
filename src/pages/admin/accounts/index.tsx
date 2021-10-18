// import React, { useEffect } from 'react';
import React from 'react';

import { AccountList, AccountNewPlaceholder } from '@app/components';
import { Account } from '@app/models/accounts';
import { AccountType } from '@app/models/common';
import { Page } from '@lib/wal-ui';

const accounts: Account[] = [
  {
    id: 'santander-id',
    accountType: AccountType.Bank,
    name: 'Santander',
    userId: '',
  },
  {
    id: 'wallet-id',
    accountType: AccountType.Wallet,
    name: 'Wallet',
    userId: '',
  },
];

const AccountsPage: React.FC = () => {
  console.log('AccountsPage rendering...');

  return (
    <>
      <Page metaTitle="Mis Cuentas" title="Mis Cuentas">
        <AccountList accounts={accounts}>
          <AccountNewPlaceholder />
        </AccountList>
      </Page>
    </>
  );
};

export default AccountsPage;
