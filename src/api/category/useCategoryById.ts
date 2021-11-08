import { useQuery, UseQueryResult } from 'react-query';

import { Category } from '@models/categories';

import { useApi } from '..';

export const useCategoryById = (id?: string): UseQueryResult<Category> => {
  const { categories } = useApi();
  return useQuery(['categories', id], () => categories.getById(id as string), {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });
};
