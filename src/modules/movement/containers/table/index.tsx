import React from 'react';

import { MovementTable } from '../../components';
import { useMovementSelectAll } from '../../hooks';
import { useMovementStore } from '../../providers';

interface IProps {
  onRemove(id: string): void;
  onUpdate(id: string): void;
  onUpdateIsPaid(id: string, checked: boolean): void;
}

const MovementTableContainer: React.FC<IProps> = ({ onRemove, onUpdate, onUpdateIsPaid }) => {
  const [{ accountId, creditCardId, categoryId, highlightType, month, quotation, year }] =
    useMovementStore();

  const { data, isLoading } = useMovementSelectAll(accountId, month, year, {
    categories: categoryId ? [categoryId] : [],
    creditCards: creditCardId ? [creditCardId] : [],
  });

  return (
    <MovementTable
      data={data || []}
      highlightType={highlightType}
      isLoading={isLoading}
      onRemove={onRemove}
      onUpdate={onUpdate}
      onUpdateIsPaid={onUpdateIsPaid}
      quotation={quotation}
    />
  );
};

export { MovementTableContainer };
