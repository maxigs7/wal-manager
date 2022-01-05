import { useQuery, UseQueryResult } from 'react-query';

import { Category, useApi } from '@entities';

import { CATEGORIES_KEY, SUB_CATEGORIES_KEY } from '../../config/constants';

const hook = (parentId?: string): UseQueryResult<Category[]> => {
  const { categories } = useApi();
  return useQuery(
    [CATEGORIES_KEY, SUB_CATEGORIES_KEY, parentId],
    () =>
      categories.getAll({
        filtering: (q) => {
          return q.eq('parent_id', parentId);
        },
        sort: { field: 'name' },
      }),
    {
      enabled: !!parentId,
    },
  );
};

export default hook;
