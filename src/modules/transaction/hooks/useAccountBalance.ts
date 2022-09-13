import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import useList from './useList';

export interface IAccountMoney {
  balance: number;
  // balancePaid: number;
  current: number;
  expenses: number;
  incomes: number;
}

const useAccountBalance = (
  accountId?: string,
  startDate?: Date,
  endDate?: Date,
  quotationPrice = 1,
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
      (money, t) => {
        if (!t.id && !t.account) {
          return money;
        }

        t.isPaid;

        return {
          incomes: (money.incomes || 0) + (t.type === 'incomes' ? t.amount : 0),
          expenses: (money.expenses || 0) + (t.type === 'expenses' ? t.amount * -1 : 0),
        };
      },
      { expenses: 0, incomes: 0 },
    );

    return {
      expenses: accountMoney.expenses * quotationPrice,
      incomes: accountMoney.incomes * quotationPrice,
      balance: (prevAmount + accountMoney.incomes - accountMoney.expenses) * quotationPrice,
      current: prevAmount * quotationPrice,
    };
  }, [data, quotationPrice]);

  return { data: balance, ...rest } as UseQueryResult<IAccountMoney>;
};

export default useAccountBalance;
