import { useCallback } from 'react';

import { useUow } from '@/api';
import { es } from '@/i18n';

type UseIsUniqueReturn = (
  name: string,
  id?: string,
  parentId?: string,
) => Promise<string | boolean>;

const useIsUnique = (): UseIsUniqueReturn => {
  const { category } = useUow();

  return useCallback(
    async (name: string, id?: string, parentId?: string) => {
      const data = await category.select({
        filter: (query) => {
          let filtered = query.eq('name', name);
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
    [category],
  );
};

export default useIsUnique;
