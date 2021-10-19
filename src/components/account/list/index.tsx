import React from 'react';

import { Account } from '@app/models/accounts';
import { CardsList } from '@lib/wal-ui';

import { AccountListItem } from '../list-item';

const AccountList: React.FC<IProps> = ({
  children,
  accounts = [],
  onDelete,
  onSelected,
  selected,
}) => {
  console.log('AccountList component rendering...', selected);
  return (
    <CardsList>
      {accounts.map((account) => (
        <AccountListItem
          account={account}
          key={account.id}
          onDelete={onDelete}
          onSelected={onSelected}
        />
      ))}
      {children}
    </CardsList>
  );
};

interface IProps {
  accounts: Account[];
  onDelete?(account: Account): void;
  onSelected?(account: Account): void;
  selected?: Account;
}

export { AccountList };
