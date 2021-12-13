import React from 'react';

import { CreditCard, CreditCardList, CreditCardNewPlaceholder, useCreditCardList } from '@entities';
import { ContentLoader } from '@shared';

const List: React.FC<IProps> = ({ onCreate, onDelete, onSelected }) => {
  const { data: creditCards, isLoading } = useCreditCardList();

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <CreditCardList creditCards={creditCards} onDelete={onDelete} onSelected={onSelected}>
      <CreditCardNewPlaceholder onSelected={onCreate} />
    </CreditCardList>
  );
};

interface IProps {
  onCreate?(): void;
  onDelete?(creditCard: CreditCard): void;
  onSelected?(creditCard: CreditCard): void;
}

export default List;
