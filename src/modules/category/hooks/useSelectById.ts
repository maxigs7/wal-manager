import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useUow } from '@api';
import { Category } from '@models';

import { CATEGORIES_KEY } from '../constants';

const useSelectCategoryById = (id?: string): UseQueryResult<Category> => {
  const { category } = useUow();

  return useQuery([CATEGORIES_KEY, id], () => category.selectById(id as string), {
    enabled: !!id,
  });
};

export default useSelectCategoryById;
