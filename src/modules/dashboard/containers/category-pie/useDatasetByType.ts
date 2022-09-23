import { useTheme } from '@chakra-ui/react';
import { useMemo } from 'react';

import { TransactionType } from '@models';

import { useTotalsByCategory } from '../../hooks';
import { buildDatasetByType } from './util';

export const useDatasetByType = (
  type: TransactionType,
  startDate: Date,
  endDate: Date,
  maxCategories: number = 5,
) => {
  const theme = useTheme();
  const { data: totals, ...queryResult } = useTotalsByCategory(startDate, endDate);

  const data = useMemo(
    () => buildDatasetByType(totals || [], type, theme, maxCategories),
    [maxCategories, theme, totals, type],
  );

  return { data, ...queryResult };
};
