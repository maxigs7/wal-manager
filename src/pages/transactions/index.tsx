import React, { useState } from 'react';

import { Button } from '@chakra-ui/react';

import { MonthsTab, TransactionTable, YearBar } from '@components';
import { TransactionPortalModal } from '@containers';
import { Card, Page } from '@lib/wal-ui';
import { TransactionDto, TransactionType } from '@models';

const TransactionsPage: React.FC = () => {
  const [year, setYear] = useState(2021);
  const [month, setMonth] = useState(0);
  const [type, setType] = useState<TransactionType>();
  const [isOpenForm, setIsOpenForm] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data: TransactionDto[] = React.useMemo(
    () => [
      {
        id: '1',
        account: 'Cuenta',
        amount: 100000,
        rootCategory: 'Salario',
        rootCategoryColor: 'red.400',
        rootCategoryIcon: 'home',
        date: new Date(),
        description: 'Salario',
        isPaid: true,
        transactionType: TransactionType.Income,
      } as TransactionDto,
      {
        id: '2',
        account: 'Cuenta',
        amount: 30000,
        rootCategory: 'Vivienda',
        rootCategoryColor: 'red.400',
        rootCategoryIcon: 'home',
        subCategory: 'Alquiler',
        date: new Date(2021, 11, 1),
        description: 'TEST',
        isPaid: false,
        transactionType: TransactionType.Expense,
      } as TransactionDto,
      {
        id: '3',
        account: 'Cuenta',
        amount: 4500,
        rootCategory: 'Servicios',
        rootCategoryColor: 'red.400',
        rootCategoryIcon: 'home',
        subCategory: 'Cablevision',
        creditCard: 'VISA',
        feeNumber: 1,
        date: new Date(),
        isPaid: false,
        transactionType: TransactionType.Expense,
      } as TransactionDto,
      {
        id: '4',
        account: 'Cuenta',
        amount: 4500,
        rootCategory: 'Servicios',
        rootCategoryColor: 'red.400',
        rootCategoryIcon: 'home',
        subCategory: 'Aguas',
        date: new Date(),
        isPaid: false,
        transactionType: TransactionType.Expense,
      } as TransactionDto,
      {
        id: '5',
        account: 'Cuenta',
        amount: 1000,
        rootCategory: 'Vivienda',
        rootCategoryColor: 'red.400',
        rootCategoryIcon: 'home',
        subCategory: 'Muebles',
        creditCard: 'AMEX',
        feeNumber: 2,
        date: new Date(),
        description: 'TEST',
        isPaid: false,
        transactionType: TransactionType.Expense,
      } as TransactionDto,
      {
        id: '6',
        account: 'Cuenta',
        amount: 4500,
        rootCategory: 'Servicios',
        rootCategoryColor: 'red.400',
        rootCategoryIcon: 'home',
        date: new Date(),
        isPaid: false,
        transactionType: TransactionType.Expense,
      } as TransactionDto,
    ],
    [],
  );

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
        <TransactionTable data={data} />
      </Card>
    </Page>
  );
};

export default TransactionsPage;
