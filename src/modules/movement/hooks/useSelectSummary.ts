import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useUow } from '@api';
import { GetMovementSummaryItem } from '@models';

import { MOVEMENTS_KEY, MOVEMENTS_SUMMARY_KEY, STALE_TIME } from '../constants';

type GetMovementsSummaryParams = {
  accountId?: string;
  currentMonth?: number;
  currentYear?: number;
  previousMonth?: number;
  previousYear?: number;
};

const useSelectSummary = ({
  accountId,
  currentMonth,
  currentYear,
  previousMonth,
  previousYear,
}: GetMovementsSummaryParams): UseQueryResult<GetMovementSummaryItem> => {
  const { movement } = useUow();
  return useQuery(
    [MOVEMENTS_KEY, MOVEMENTS_SUMMARY_KEY, accountId, currentMonth, currentYear],
    () =>
      movement
        .rpc<'getMovementsSummary'>('getMovementsSummary', {
          pAccountId: accountId as string,
          pCurrentMonth: currentMonth as number,
          pCurrentYear: currentYear as number,
          pPreviousMonth: previousMonth as number,
          pPreviousYear: previousYear as number,
        })
        .then((rows) => {
          return rows[0];
        }),
    {
      enabled:
        !!accountId &&
        (!!currentMonth || currentMonth === 0) &&
        !!currentYear &&
        (!!previousMonth || previousMonth === 0) &&
        !!previousYear,
      staleTime: STALE_TIME, // 8 minute
    },
  );
};

export default useSelectSummary;
