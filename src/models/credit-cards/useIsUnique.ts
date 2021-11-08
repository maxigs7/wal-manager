import { useCallback } from 'react';

import { useApi } from '@api';

export const useIsUnique = (): ((name: string, id?: string) => Promise<string | boolean>) => {
  const { creditCards } = useApi();

  return useCallback(
    async (name: string, id?: string) => {
      const data = await creditCards.getAll({
        filtering: (q) => {
          const filtered = q.eq('name', name);
          return id ? filtered.neq('id', id) : filtered;
        },
      });

      if (data.length > 0) return 'Ya existe una tarjeta con ese nombre';
      return true;
    },
    [creditCards],
  );
};
