import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { formatISO } from 'date-fns';

import { useRpc } from '@api';

import { TOTALS_BY_CATEGORY } from '../constants';
import { CategoryTotalItem } from '../models';

const useTotalsByCategory = (
  startDate: Date,
  endDate: Date,
): UseQueryResult<CategoryTotalItem[]> => {
  const rpc = useRpc();
  return useQuery(
    [TOTALS_BY_CATEGORY, formatISO(startDate), formatISO(endDate)],
    () => new Promise(() => []),
  );
};

export default useTotalsByCategory;
