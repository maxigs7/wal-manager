import React from 'react';

import { Flex } from '@chakra-ui/react';

import { Account } from '@entities';

import ListItem from '../list-item';

interface IProps {
  accounts: Account[];
  onDelete?(account: Account): void;
  onSelected?(account: Account): void;
}

const List: React.FC<IProps> = ({ children, accounts = [], onDelete, onSelected }) => (
  <Flex direction={['column', 'row']} wrap="wrap">
    {accounts.map((account) => (
      <ListItem
        account={account}
        h="64"
        key={account.id}
        mb="5"
        mr="5"
        onDelete={onDelete}
        onSelected={onSelected}
        w={['full', '64']}
      />
    ))}
    {children}
  </Flex>
);

export default List;
