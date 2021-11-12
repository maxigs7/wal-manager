import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Category, CategoryType } from '@models';

export const useCategoryList = (categoryType: CategoryType): UseQueryResult<Category[]> => {
  const { categories } = useApi();
  return useQuery<Category[]>(
    ['categories', categoryType],
    () =>
      categories.getAll({
        filtering: (q) => {
          return q.eq('type', categoryType).is('parent_id', null);
        },
        sort: { field: 'name' },
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false, // turned off by default, manual refetch is needed
    },
  );
};

export const useSubCategoryList = (parentId: string): UseQueryResult<Category[]> => {
  const { categories } = useApi();
  return useQuery<Category[]>(
    ['sub-categories', parentId],
    () =>
      categories.getAll({
        filtering: (q) => {
          return q.eq('parent_id', parentId);
        },
        sort: { field: 'name' },
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false, // turned off by default, manual refetch is needed
    },
  );
};
