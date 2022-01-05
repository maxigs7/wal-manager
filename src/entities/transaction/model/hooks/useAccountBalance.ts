import { useMemo } from 'react';
import { UseQueryResult } from 'react-query';

import { TransactionType } from '@entities';

import useList from './useList';

export interface IAccountBalance {
  account: string;
  incomes: number;
  expenses: number;
}

const hook = (startDate?: Date, endDate?: Date): UseQueryResult<IAccountBalance[]> => {
  const { data, ...rest } = useList(startDate, endDate);
  const balance = useMemo(() => {
    if (!data) return undefined;
    const prev = data.find((t) => !t.id && !t.account);
    const prevAmount = prev?.amount || 0;
    const balances = data.reduce<IAccountBalance[]>((balances, t) => {
      balances = balances || [];
      if (!t.id && !t.account) {
        return balances;
      }
      const account = balances.find((b) => b.account === t.account);
      if (account) {
        account.incomes += t.type === TransactionType.Income ? t.amount : 0;
        account.expenses += t.type === TransactionType.Expense ? t.amount : 0;
      } else {
        balances.push({
          account: t.account,
          incomes: t.type === TransactionType.Income ? prevAmount + t.amount : prevAmount,
          expenses: t.type === TransactionType.Expense ? t.amount : 0,
        });
      }

      return balances;
    }, []);

    return balances;
  }, [data]);

  return { data: balance, ...rest } as UseQueryResult<IAccountBalance[]>;
};

export default hook;
