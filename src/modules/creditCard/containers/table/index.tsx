import React from 'react';

import { CreditCardTable } from '../../components';
import { useCreditCardSelectAll } from '../../hooks';

interface IProps {
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

const CreditCardTableContainer: React.FC<IProps> = ({ onRemove, onUpdate }) => {
  const { data: creditCards, isLoading } = useCreditCardSelectAll();

  return (
    <CreditCardTable
      data={creditCards || []}
      isLoading={isLoading}
      onRemove={onRemove}
      onUpdate={onUpdate}
    />
  );
};

export { CreditCardTableContainer };
