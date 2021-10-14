import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

import { CreditCard } from '@app/models/credit-cards';

import { CreditCardListItem } from '../list-item';

const CreditCardList: React.FC<IProps> = ({
  children,
  creditCards = [],
  onSelected,
  selected,
  ...flexProps
}) => {
  console.log('CreditCardList component rendering...', selected);
  return (
    <Flex {...flexProps} flexWrap="wrap">
      {creditCards.map((cc) => (
        <CreditCardListItem
          cc={cc}
          isActive={cc === selected}
          key={cc.id}
          onSelected={onSelected}
        />
      ))}
      {children}
    </Flex>
  );
};

interface IProps extends FlexProps {
  creditCards: CreditCard[];
  onSelected?(cc: CreditCard): void;
  selected?: CreditCard;
}

export { CreditCardList };
