import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Category } from '@models';

import { CATEGORIES_KEY, SUB_CATEGORIES_KEY } from './constants';

const useById = (key: string, id?: string): UseQueryResult<Category> => {
  const { categories } = useApi();
  return useQuery([key, id], () => categories.getById(id as string), {
    enabled: !!id, // turned off by default, manual refetch is needed
  });
};

export const useCategoryById = (id?: string): UseQueryResult<Category> =>
  useById(CATEGORIES_KEY, id);

export const useSubCategoryById = (id?: string): UseQueryResult<Category> =>
  useById(SUB_CATEGORIES_KEY, id);
