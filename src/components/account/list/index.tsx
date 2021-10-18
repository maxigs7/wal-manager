import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

import { Account } from '@app/models/accounts';

import { AccountListItem } from '../list-item';

const AccountList: React.FC<IProps> = ({
  children,
  accounts = [],
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
          onSelected={onSelected}
        />
      ))}
      {children}
    </Flex>
  );
};

interface IProps extends FlexProps {
  accounts: Account[];
  onSelected?(account: Account): void;
  selected?: Account;
}

export { AccountList };
