import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

import { Account } from '@app/models/accounts';

import { AccountListItem } from '../list-item';

const AccountList: React.FC<IProps> = ({
  children,
  accounts = [],
  onDelete,
  onSelected,
  selected,
  ...flexProps
}) => {
  console.log('AccountList component rendering...', selected);
  return (
    <Flex {...flexProps} flexWrap="wrap">
      {accounts.map((account) => (
        <AccountListItem
          account={account}
          isActive={account === selected}
          key={account.id}
          onDelete={onDelete}
          onSelected={onSelected}
        />
      ))}
      {children}
    </Flex>
  );
};

interface IProps extends FlexProps {
  accounts: Account[];
  onDelete?(account: Account): void;
  onSelected?(account: Account): void;
  selected?: Account;
}

export { AccountList };
