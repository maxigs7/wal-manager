import { useQuery, UseQueryResult } from 'react-query';

import { Category, useApi } from '@entities';

import { CATEGORIES_KEY } from '../../config/constants';

const hook = (id?: string): UseQueryResult<Category> => {
  const { categories } = useApi();
  return useQuery([CATEGORIES_KEY, id], () => categories.getById(id as string), {
    enabled: !!id,
  });
};

export default hook;
