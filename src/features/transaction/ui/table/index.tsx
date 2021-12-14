import React, { useMemo } from 'react';

import { addMilliseconds, addMonths } from 'date-fns';

import { TransactionTable, useTransactionList } from '@entities';
import { ContentLoader } from '@shared';

interface IProps {
  month: number;
  onRemove(id: string): void;
  year: number;
}

const Table: React.FC<IProps> = ({ month, onRemove, year }) => {
  const startDate = useMemo(() => new Date(year, month, 1, 0, 0, 0), [year, month]);
  const endDate = useMemo(() => addMilliseconds(addMonths(startDate, 1), -1), [startDate]);
  const { data, isLoading } = useTransactionList(startDate, endDate);

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <TransactionTable
      data={data || []}
      onRemove={onRemove}
      onUpdate={() => console.log('updating...')}
    />
  );
};

export default Table;
