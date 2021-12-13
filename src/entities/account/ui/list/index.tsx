import React from 'react';

import { ScaleFade } from '@chakra-ui/react';

import { Account } from '@entities';
import { CardList } from '@shared';

import ListItem from '../list-item';

interface IProps {
  accounts: Account[];
  onDelete?(account: Account): void;
  onSelected?(account: Account): void;
}

const List: React.FC<IProps> = ({ children, accounts = [], onDelete, onSelected }) => (
  <CardList>
    {accounts.map((account) => (
      <ScaleFade in={true} initialScale={0.5} key={account.id} unmountOnExit={true}>
        <ListItem account={account} onDelete={onDelete} onSelected={onSelected} />
      </ScaleFade>
    ))}
    <ScaleFade in={true} initialScale={0.5}>
      {children}
    </ScaleFade>
  </CardList>
);

export default List;
