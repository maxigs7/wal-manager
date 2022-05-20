import React from 'react';

import { Flex, ScaleFade } from '@chakra-ui/react';

import { CreditCard } from '@models';

import ListItem from '../list-item';

interface IProps {
  creditCards?: CreditCard[];
  onDelete?(creditCard: CreditCard): void;
  onSelected?(creditCard: CreditCard): void;
}

const List: React.FC<IProps> = ({ children, creditCards = [], onDelete, onSelected }) => (
  <Flex direction={['column', 'row']} gap="5" wrap="wrap">
    {creditCards.map((creditCard) => (
      <ScaleFade in={true} initialScale={0.5} key={creditCard.id}>
        <ListItem
          creditCard={creditCard}
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
