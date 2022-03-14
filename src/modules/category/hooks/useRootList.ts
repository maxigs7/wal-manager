import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Category, CategoryType } from '@models';

import { CATEGORIES_KEY } from '../constants';

const hook = (type?: CategoryType): UseQueryResult<Category[]> => {
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

export default hook;
