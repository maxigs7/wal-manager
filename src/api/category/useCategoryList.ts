import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Category } from '@models/categories';
import { CategoryType } from '@models/common';

export const useCategoryList = (categoryType: CategoryType): UseQueryResult<Category[]> => {
  const { categories } = useApi();
  return useQuery<Category[]>(
    ['categories', categoryType],
    () =>
      categories.getAll({
        filtering: (q) => {
          return q.eq('type', categoryType);
        },
        sort: { field: 'name' },
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false, // turned off by default, manual refetch is needed
    },
  );
};

export const useSubCategoryList = (parentId?: string): UseQueryResult<Category[]> => {
  const { categories } = useApi();
  return useQuery<Category[]>(
    ['categories', parentId],
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
