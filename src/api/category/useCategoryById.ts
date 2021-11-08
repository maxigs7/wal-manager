import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Category } from '@models';

export const useCategoryById = (id?: string): UseQueryResult<Category> => {
  const { categories } = useApi();
  return useQuery(['categories', id], () => categories.getById(id as string), {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });
};
