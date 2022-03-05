import React from 'react';

import { useWhyDidYouUpdate } from '@chakra-ui/react';

import { TransactionTable, useTransactionList } from '@entities';
import { ContentLoader } from '@shared';

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
