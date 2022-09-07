import { useCallback } from 'react';

import { useSupabaseApi } from '@api';
import { es } from '@i18n';
import { CategoryType } from '@models';

type UseIsUniqueReturn = (
  type: CategoryType,
  name: string,
  id?: string,
  parentId?: string,
) => Promise<string | boolean>;

const useIsUnique = (): UseIsUniqueReturn => {
  const { categories } = useSupabaseApi();

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

      if (data.length > 0) return es.category.toast.uniqueError;
      return true;
    },
    [categories],
  );
};

export default useIsUnique;
