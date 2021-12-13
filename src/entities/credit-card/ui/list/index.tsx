import React from 'react';

import { ScaleFade } from '@chakra-ui/react';

import { CreditCard } from '@entities';
import { CardList } from '@shared';

import ListItem from '../list-item';

const List: React.FC<IProps> = ({ children, creditCards = [], onDelete, onSelected }) => (
  <CardList>
    {creditCards.map((creditCard) => (
      <ScaleFade in={true} initialScale={0.5} key={creditCard.id} unmountOnExit={true}>
        <ListItem creditCard={creditCard} onDelete={onDelete} onSelected={onSelected} />
      </ScaleFade>
    ))}
    <ScaleFade in={true} initialScale={0.5}>
      {children}
    </ScaleFade>
  </CardList>
);

interface IProps {
  creditCards?: CreditCard[];
  onDelete?(creditCard: CreditCard): void;
  onSelected?(creditCard: CreditCard): void;
}

export default List;
