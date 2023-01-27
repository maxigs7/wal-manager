import { useQuery, UseQueryResult } from '@tanstack/react-query';


import { useUow } from '@/api';
import { Category } from '@/models';

import { CATEGORIES_KEY } from '../constants';

const useSelectAll = (): UseQueryResult<Category[]> => {
  const { category } = useUow();

  return useQuery([CATEGORIES_KEY], () => category.select());
};

export default useSelectAll;
