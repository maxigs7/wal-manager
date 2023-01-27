import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useUow } from '@api';
import { GetMovementItem, MovementType } from '@models';

import { MOVEMENTS_GRID_KEY, MOVEMENTS_KEY, STALE_TIME } from '../constants';

interface GetMovementFilter {
  categories?: string[];
  creditCards?: string[];
  isPaid?: boolean;
  type?: MovementType;
}

const useSelectAll = (
  accountId?: string,
  month?: number,
  year?: number,
  filters: GetMovementFilter = {},
): UseQueryResult<GetMovementItem[]> => {
  const { movement } = useUow();
  return useQuery(
    [MOVEMENTS_KEY, MOVEMENTS_GRID_KEY, accountId, month, year],
    () =>
      movement.rpc<'getMovements'>('getMovements', {
        pAccountId: accountId as string,
        pMonth: month as number,
        pYear: year as number,
      }),
    {
      enabled: (!!month || month === 0) && !!year && !!accountId,
      select: (data: GetMovementItem[]) => {
        const { categories = [], creditCards = [], isPaid, type } = filters;
        let filteredData = data;
        if (categories.length) {
          filteredData = filteredData.filter(
            (t) =>
              categories.includes(t.rootCategoryId) ||
              (t.subCategoryId && categories.includes(t.subCategoryId)),
          );
        }
        if (creditCards.length) {
          filteredData = filteredData.filter(
            (t) => t.creditCardId && creditCards.includes(t.creditCardId),
          );
        }
        if (typeof isPaid !== 'undefined') {
          filteredData = filteredData.filter((t) => t.isPaid === isPaid);
        }
        if (typeof type !== 'undefined') {
          filteredData = filteredData.filter((t) => t.type === type);
        }
        return filteredData;
      },
      staleTime: STALE_TIME, // 8 minute
    },
  );
};

export default useSelectAll;
