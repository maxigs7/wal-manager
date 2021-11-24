import React, { useMemo, useState } from 'react';

import { Button } from '@chakra-ui/react';
import { addMilliseconds, addMonths } from 'date-fns';

import { useTransactionList } from '@api';
import { MonthsTab, TransactionTable, YearBar } from '@components';
import { TransactionPortalModal } from '@containers';
import { Card, Page } from '@lib/wal-ui';
import { TransactionType } from '@models';

const TransactionsPage: React.FC = () => {
  const [year, setYear] = useState(2021);
  const [month, setMonth] = useState(10);
  const [type, setType] = useState<TransactionType>();
  const [isOpenForm, setIsOpenForm] = useState(false);

  const startDate = useMemo(() => new Date(year, month, 1), [year, month]);
  const endDate = useMemo(() => addMilliseconds(addMonths(startDate, 1), -1), [startDate]);
  const { data } = useTransactionList(startDate, endDate);

  return (
    <Page metaTitle="Movimientos" title="Movimientos">
      <Button
        onClick={() => {
          setType(TransactionType.Income);
          setIsOpenForm(true);
        }}
      >
        Nuevo Ingreso
      </Button>
      <Button
        onClick={() => {
          setType(TransactionType.Expense);
          setIsOpenForm(true);
        }}
      >
        Nuevo Gasto
      </Button>
      <TransactionPortalModal
        isOpenForm={isOpenForm}
        isOpenRemove={false}
        onConfirmed={() => setIsOpenForm(false)}
        onDismiss={() => setIsOpenForm(false)}
        type={type}
      />

      <Card>
        <YearBar currentYear={year} onUpdateYear={setYear} />
        <MonthsTab currentMonth={month} onTabChange={setMonth} />
        <TransactionTable data={data || []} />
      </Card>
    </Page>
  );
};

export default TransactionsPage;
