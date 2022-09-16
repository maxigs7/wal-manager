import { getToken, useTheme } from '@chakra-ui/react';
import { useMemo } from 'react';

import { CategoryTotalItem, TransactionType } from '@models';

import { useTotalsByCategory } from '../../hooks';

export interface IExpenseDataset {
  amount: number;
  children?: IExpenseDataset[];
  color: string;
  id: string;
  label: string;
}

export const useDatasetByType = (type: TransactionType, startDate: Date, endDate: Date) => {
  const theme = useTheme();
  const { data: totals, ...queryResult } = useTotalsByCategory(startDate, endDate);

  const data = useMemo(() => {
    const safeTotals = totals || [];
    const totalsType = safeTotals.filter((t) => t.type === type);

    const typeDataset = totalsType.reduce(
      (dataset: IExpenseDataset[], category: CategoryTotalItem) => {
        if (dataset.some((item) => item.id === category.rootCategoryId)) return dataset;

        const amount: number = totalsType
          .filter((cat) => category.rootCategoryId === cat.rootCategoryId)
          .reduce((accum, t) => accum + t.amount, 0);
        const color = getToken('colors', category.rootCategoryColor)(theme);
        const parent: IExpenseDataset = {
          label: category.rootCategory,
          amount,
          children: totalsType
            .filter((child) => child.rootCategoryId === category.rootCategoryId)
            .map(
              (child) =>
                ({
                  label: child.subCategory ?? child.rootCategory,
                  amount: child.amount,
                  id: child.subCategoryId ?? child.rootCategoryId,
                  color,
                } as IExpenseDataset),
            ),
          id: category.rootCategoryId,
          color,
        };
        return [...dataset, parent];
      },
      [],
    );

    return typeDataset;
  }, [theme, totals, type]);

  return { data, ...queryResult };
};
