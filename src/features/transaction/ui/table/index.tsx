import React, { useMemo } from 'react';

import { addMilliseconds, addMonths } from 'date-fns';

import { TransactionTable, useTransactionList } from '@entities';
import { ContentLoader } from '@shared';

interface IProps {
  month: number;
  year: number;
}

const Table: React.FC<IProps> = ({ month, year }) => {
  const startDate = useMemo(() => new Date(year, month, 1), [year, month]);
  const endDate = useMemo(() => addMilliseconds(addMonths(startDate, 1), -1), [startDate]);
  const { data, isLoading } = useTransactionList(startDate, endDate);

  if (isLoading) {
    return <ContentLoader />;
  }

  return <TransactionTable data={data || []} />;
};

export default Table;
