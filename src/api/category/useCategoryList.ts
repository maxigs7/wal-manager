import { useQuery, useQueryClient, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Category, CategoryLookup, CategoryType } from '@models';

import { CATEGORIES_KEY, SUB_CATEGORIES_KEY } from './constants';
import { convertToCategoryLookupArray } from './converter';

const useList = (key: string, subKey: any, promise: () => Promise<Category[]>) =>
  useQuery<Category[]>([key, subKey], promise, {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });

export const useCategoryList = (categoryType: CategoryType): UseQueryResult<Category[]> => {
  const { categories } = useApi();
  return useList(CATEGORIES_KEY, categoryType, () =>
    categories.getAll({
      filtering: (q) => {
        return q.eq('type', categoryType).is('parent_id', null);
      },
      sort: { field: 'name' },
    }),
  );
};

export const useSubCategoryList = (parentId: string): UseQueryResult<Category[]> => {
  const { categories } = useApi();
  return useList(SUB_CATEGORIES_KEY, parentId, () =>
    categories.getAll({
      filtering: (q) => {
        return q.eq('parent_id', parentId);
      },
      sort: { field: 'name' },
    }),
  );
};

export const useCategoriesRefresh = (): ((category: Category) => void) => {
  const queryClient = useQueryClient();

  return (category) => {
    queryClient.invalidateQueries([CATEGORIES_KEY, category.type], {
      exact: true,
      refetchInactive: true,
    });
  };
};

export const useSubCategoriesRefresh = (): ((category: Category) => void) => {
  const queryClient = useQueryClient();

  return (category) => {
    queryClient.invalidateQueries([SUB_CATEGORIES_KEY, category.parentId], {
      exact: true,
      refetchInactive: true,
    });
  };
};

export const useCategoryLookup = (type: CategoryType): UseQueryResult<CategoryLookup[]> => {
  const { categories } = useApi();

  const promise = async () => {
    const list = await categories.getAll({
      filtering: (q) => {
        return q.eq('type', type);
      },
    });

    return convertToCategoryLookupArray(list);
  };

  return useQuery<CategoryLookup[]>([CATEGORIES_KEY, type, 'lookup'], promise, {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });
};
