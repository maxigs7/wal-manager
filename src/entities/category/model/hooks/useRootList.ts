import { useQuery, UseQueryResult } from 'react-query';

import { Category, CategoryType, useApi } from '@entities';

import { CATEGORIES_KEY } from '../../config/constants';

export default (type?: CategoryType): UseQueryResult<Category[]> => {
  const { categories } = useApi();
  return useQuery(
    [CATEGORIES_KEY, 'root', type],
    () =>
      categories.getAll({
        filtering: (q) => {
          return q.eq('type', type).is('parent_id', null);
        },
        sort: { field: 'name' },
      }),
    {
      enabled: !!type,
    },
  );
};
