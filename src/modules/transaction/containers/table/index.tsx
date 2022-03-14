import React from 'react';

import { ContentLoader } from '@shared';

import { TransactionTable } from '../../components';
import { useTransactionList } from '../../hooks';

interface IProps {
  endDate: Date;
  onMoreActions(id: string): void;
  onRemove(id: string): void;
  onUpdate(id: string): void;
  startDate: Date;
}

const Table: React.FC<IProps> = ({ endDate, onMoreActions, onRemove, onUpdate, startDate }) => {
  const { data, isLoading } = useTransactionList(startDate, endDate);

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <TransactionTable
      data={data || []}
      onMoreActions={onMoreActions}
      onRemove={onRemove}
      onUpdate={onUpdate}
    />
  );
};

export default React.memo(Table);
