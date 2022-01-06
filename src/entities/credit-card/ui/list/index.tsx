import React from 'react';

import { Flex } from '@chakra-ui/react';

import { CreditCard } from '@entities';

import ListItem from '../list-item';

interface IProps {
  creditCards?: CreditCard[];
  onDelete?(creditCard: CreditCard): void;
  onSelected?(creditCard: CreditCard): void;
}

const List: React.FC<IProps> = ({ children, creditCards = [], onDelete, onSelected }) => (
  <Flex direction={['column', 'row']} wrap="wrap">
    {creditCards.map((creditCard) => (
      <ListItem
        creditCard={creditCard}
        h="64"
        key={creditCard.id}
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
