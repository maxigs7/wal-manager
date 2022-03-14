import React from 'react';

import { CreditCard } from '@models';
import { CardPlaceholder, ContentLoader, Icon } from '@shared';

import { CreditCardList } from '../../components';
import { useCreditCardList } from '../../hooks';

const List: React.FC<IProps> = ({ onCreate, onDelete, onSelected }) => {
  const { data: creditCards, isLoading } = useCreditCardList();

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <CreditCardList creditCards={creditCards} onDelete={onDelete} onSelected={onSelected}>
      <CardPlaceholder onClick={onCreate}>
        <Icon icon="plus" mb={3} size="3x" />
        Añadir Tarjeta
      </CardPlaceholder>
    </CreditCardList>
  );
};

interface IProps {
  onCreate?(): void;
  onDelete?(creditCard: CreditCard): void;
  onSelected?(creditCard: CreditCard): void;
}

export default List;
