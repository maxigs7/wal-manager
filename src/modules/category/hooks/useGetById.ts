import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabaseApi } from '@api';
import { Category } from '@models';

import { CATEGORIES_KEY } from '../constants';

const useGetById = (id?: string): UseQueryResult<Category> => {
  const { categories } = useSupabaseApi();
  return useQuery([CATEGORIES_KEY, id], () => categories.getById(id as string), {
    enabled: !!id,
  });
};

export default useGetById;
