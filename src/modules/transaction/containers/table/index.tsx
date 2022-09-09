import React from 'react';

import { TransactionTable } from '../../components';
import { useTransactionList } from '../../hooks';
import { useTransactionStore } from '../../providers';

interface IProps {
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

const TransactionTableContainer: React.FC<IProps> = ({ onRemove, onUpdate }) => {
  const [{ account, startDate, endDate, creditCardId, categoryId, highlightType, quotation }] =
    useTransactionStore();

  const { data, isLoading } = useTransactionList(account?.id, startDate, endDate, {
    categories: categoryId ? [categoryId] : [],
    creditCards: creditCardId ? [creditCardId] : [],
  });

  return (
    <TransactionTable
      data={data || []}
      highlightType={highlightType}
      isLoading={isLoading}
      onRemove={onRemove}
      onUpdate={onUpdate}
      quotation={quotation}
    />
  );
};

export { TransactionTableContainer };
