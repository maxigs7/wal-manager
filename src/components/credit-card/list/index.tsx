import React from 'react';

import { CreditCard } from '@app/models/credit-cards';
import { CardsList } from '@lib/wal-ui';

import { CreditCardListItem } from '../list-item';

const CreditCardList: React.FC<IProps> = ({
  children,
  creditCards = [],
  onDelete,
  onSelected,
  selected,
}) => {
  console.log('CreditCardList component rendering...', selected);
  return (
    <CardsList>
      {creditCards.map((creditCard) => (
        <CreditCardListItem
          creditCard={creditCard}
          key={creditCard.id}
          onDelete={onDelete}
          onSelected={onSelected}
        />
      ))}
      {children}
    </CardsList>
  );
};

interface IProps {
  creditCards: CreditCard[];
  onDelete?(creditCard: CreditCard): void;
  onSelected?(creditCard: CreditCard): void;
  selected?: CreditCard;
}

export { CreditCardList };
