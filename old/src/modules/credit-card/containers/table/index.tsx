import React from 'react';

import { ContentLoader, useTextFilter } from '@shared';

import { CreditCardTable } from '../../components';
import { useCreditCardList } from '../../hooks';

interface IProps {
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

const Table: React.FC<IProps> = ({ onRemove, onUpdate }) => {
  const [{ text }] = useTextFilter();
  const { data: creditCards, isLoading } = useCreditCardList(text);

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <CreditCardTable data={creditCards || []} minH="80" onRemove={onRemove} onUpdate={onUpdate} />
  );
};

export default React.memo(Table);
