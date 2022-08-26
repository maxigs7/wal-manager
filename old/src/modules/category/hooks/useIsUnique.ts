import { useCallback } from 'react';

import { useApi } from '@api';
import { CategoryType } from '@models';

type UseIsUniqueReturn = (
  type: CategoryType,
  name: string,
  id?: string,
  parentId?: string,
) => Promise<string | boolean>;

const hook = (): UseIsUniqueReturn => {
  const { categories } = useApi();

  return useCallback(
    async (type: CategoryType, name: string, id?: string, parentId?: string) => {
      const data = await categories.getAll({
        filtering: (q) => {
          let filtered = q.eq('type', type).eq('name', name);
          if (parentId) {
            filtered = filtered.eq('parentId', parentId);
          } else {
            filtered = filtered.is('parentId', null);
          }
          if (id) {
            filtered.neq('id', id);
          }
          return filtered;
        },
      });

      if (data.length > 0) return 'Ya existe una categoria con ese nombre';
      return true;
    },
    [categories],
  );
};

export default hook;
