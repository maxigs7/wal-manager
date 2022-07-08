import React from 'react';

import { ContentLoader } from '@shared';

import { TransactionTable } from '../../components';
import { useTransactionList } from '../../hooks';
import { useTransactionStore } from '../../providers';

interface IProps {
  onMoreActions(id: string): void;
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

const Table: React.FC<IProps> = ({ onMoreActions, onRemove, onUpdate }) => {
  const [{ accountId, startDate, endDate, creditCardId, categoryId, highlightType }] =
    useTransactionStore();

  const { data, isLoading } = useTransactionList(accountId, startDate, endDate, {
    categories: categoryId ? [categoryId] : [],
    creditCards: creditCardId ? [creditCardId] : [],
  });

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <TransactionTable
      data={data || []}
      highlightType={highlightType}
      onMoreActions={onMoreActions}
      onRemove={onRemove}
      onUpdate={onUpdate}
    />
  );
};

export default Table;
