import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { formatISO } from 'date-fns';

import { useSupabaseClient } from '@api';
import { CategoryTotalItem } from '@models';

import { TOTALS_BY_CATEGORY } from '../constants';

const useTotalsByCategory = (
  startDate: Date,
  endDate: Date,
): UseQueryResult<CategoryTotalItem[]> => {
  const { dashboard } = useSupabaseClient();
  return useQuery([TOTALS_BY_CATEGORY, formatISO(startDate), formatISO(endDate)], () =>
    dashboard.getTotalsByCategory(startDate, endDate),
  );
};

export default useTotalsByCategory;
