import React from 'react';

import { HStack } from '@chakra-ui/react';

import { CreditCard } from '@app/models/credit-cards';

import { CreditCardListItem } from '../list-item';

const CreditCardList: React.FC<IProps> = ({ children, creditCards = [], onSelected, selected }) => {
  console.log('CreditCardList component rendering...', selected);
  return (
    <HStack spacing={5} wrap="wrap">
      {creditCards.map((cc) => (
        <CreditCardListItem
          cc={cc}
          isActive={cc === selected}
          key={cc.id}
          onSelected={onSelected}
        />
      ))}
      {children}
    </HStack>
  );
};

interface IProps {
  creditCards: CreditCard[];
  onSelected?(cc: CreditCard): void;
  selected?: CreditCard;
}

export { CreditCardList };
