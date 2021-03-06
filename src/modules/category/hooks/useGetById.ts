import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Category } from '@models';

import { CATEGORIES_KEY } from '../constants';

const hook = (id?: string): UseQueryResult<Category> => {
  const { categories } = useApi();
  return useQuery([CATEGORIES_KEY, id], () => categories.getById(id as string), {
    enabled: !!id,
  });
};

export default hook;
