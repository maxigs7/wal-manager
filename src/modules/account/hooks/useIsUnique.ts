import { useCallback } from 'react';

import { useApi } from '@api';

type UseIsUniqueReturn = (name: string, id?: string) => Promise<string | boolean>;

const hook = (): UseIsUniqueReturn => {
  const { accounts } = useApi();

  return useCallback(
    async (name: string, id?: string) => {
      const data = await accounts.getAll({
        filtering: (q) => {
          const filtered = q.eq('name', name).is('archivedAt', null);
          return id ? filtered.neq('id', id) : filtered;
        },
      });

      if (data.length > 0) return 'Ya existe una cuenta con ese nombre';
      return true;
    },
    [accounts],
  );
};

export default hook;
