import { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import { CreditCardType } from '@models';

import useList from './useList';

export interface ICreditCardSummary {
  amount: number;
  cc: string;
  type: CreditCardType;
}

const useCreditCardSummary = (
  accountId?: string,
  startDate?: Date,
  endDate?: Date,
): UseQueryResult<ICreditCardSummary[]> => {
  const { data, ...rest } = useList(accountId, startDate, endDate);
  const balance = useMemo(() => {
    if (!data) return undefined;

    const summary = data.reduce<ICreditCardSummary[]>((summary, t) => {
      summary = summary || [];
      if (!t.creditCard) {
        return summary;
      }
      const cc = summary.find((s) => s.cc === t.creditCard);
      if (cc) {
        cc.amount += t.amount * -1;
      } else {
        summary.push({
          amount: t.amount * -1,
          cc: t.creditCard,
          type: t.creditCardType as CreditCardType,
        });
      }

      return summary;
    }, []);

    return summary.sort(({ cc: cc1 }, { cc: cc2 }) => {
      if (cc1 < cc2) return -1;
      if (cc1 > cc2) return 1;
      return 0;
    });
  }, [data]);

  return { data: balance, ...rest } as UseQueryResult<ICreditCardSummary[]>;
};

export default useCreditCardSummary;
