import React from 'react';

import { Flex, ScaleFade } from '@chakra-ui/react';

import { Account } from '@models';

import ListItem from '../list-item';

interface IProps {
  accounts: Account[];
  onDelete?(account: Account): void;
  onSelected?(account: Account): void;
}

const List: React.FC<IProps> = ({ children, accounts = [], onDelete, onSelected }) => (
  <Flex direction={['column', 'row']} gap="5" wrap="wrap">
    {accounts.map((account) => (
      <ScaleFade in={true} initialScale={0.5} key={account.id}>
        <ListItem
          account={account}
          h="64"
          onDelete={onDelete}
          onSelected={onSelected}
          w={['full', '64']}
        />
      </ScaleFade>
    ))}
    <ScaleFade in={true} initialScale={0.5}>
      {children}
    </ScaleFade>
  </Flex>
);

export default List;
