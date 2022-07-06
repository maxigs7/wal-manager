import { useMemo } from 'react';
import { UseQueryResult } from 'react-query';

import useList from './useList';

export interface IAccountMoney {
  balance: number;
  current: number;
  expenses: number;
  incomes: number;
}

const hook = (
  accountId?: string,
  startDate?: Date,
  endDate?: Date,
): UseQueryResult<IAccountMoney> => {
  const { data, ...rest } = useList(accountId, startDate, endDate);
  const balance: IAccountMoney = useMemo(() => {
    if (!data)
      return {
        balance: 0,
        current: 0,
        expenses: 0,
        incomes: 0,
      };

    const prev = data.find((t) => !t.id && !t.account);
    const prevAmount = prev?.amount || 0;

    const accountMoney = data.reduce<{ expenses: number; incomes: number }>(
      (money = { expenses: 0, incomes: 0 }, t) => {
        if (!t.id && !t.account) {
          return money;
        }

        return {
          incomes: money.incomes || 0 + (t.type === 'incomes' ? t.amount : 0),
          expenses: money.expenses || 0 + (t.type === 'expenses' ? t.amount * -1 : 0),
        };
      },
      { expenses: 0, incomes: 0 },
    );

    return {
      ...accountMoney,
      balance: prevAmount + accountMoney.incomes - accountMoney.expenses,
      current: prevAmount,
    };
  }, [data]);

  return { data: balance, ...rest } as UseQueryResult<IAccountMoney>;
};

export default hook;
