import React, { useMemo } from 'react';

import { Flex, CircularProgress } from '@chakra-ui/react';
import { addMilliseconds, addMonths } from 'date-fns';

import { useTransactionList } from '@api';
import { MonthsTab, TransactionTable, YearBar } from '@components';
import { Card } from '@lib/wal-ui';

const TransactionsList: React.FC<IProps> = ({ month, setMonth, setYear, year }) => {
  const startDate = useMemo(() => new Date(year, month, 1), [year, month]);
  const endDate = useMemo(() => addMilliseconds(addMonths(startDate, 1), -1), [startDate]);
  const { data, isLoading } = useTransactionList(startDate, endDate);

  return (
    <Card>
      <YearBar currentYear={year} onUpdateYear={setYear} />
      <MonthsTab currentMonth={month} onTabChange={setMonth} />
      {isLoading && (
        <Flex align="center" justify="center" p={10}>
          <CircularProgress color="crimson.300" isIndeterminate />
        </Flex>
      )}

      {!isLoading && <TransactionTable data={data || []} />}
    </Card>
  );
};

interface IProps {
  month: number;
  setMonth(month: number): void;
  setYear(year: number): void;
  year: number;
}

export { TransactionsList };
