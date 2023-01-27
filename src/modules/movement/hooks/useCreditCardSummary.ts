import { useMemo } from 'react';

import { UseQueryResult } from '@tanstack/react-query';

import { CreditCardType } from '@/models';

import { CreditCardSummary } from '../models';
import useSelectAll from './useSelectAll';


const useCreditCardSummary = (
  accountId?: string,
  month?: number,
  year?: number,
): UseQueryResult<CreditCardSummary[]> => {
  const { data, ...rest } = useSelectAll(accountId, month, year);
  const balance = useMemo(() => {
    if (!data) return undefined;

    const summary = data.reduce<CreditCardSummary[]>((summary, t) => {
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

  return { data: balance, ...rest } as UseQueryResult<CreditCardSummary[]>;
};

export default useCreditCardSummary;
