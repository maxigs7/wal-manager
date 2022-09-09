import { useCallback } from 'react';

import { useSupabaseClient } from '@api';
import { es } from '@i18n';

type UseIsUniqueReturn = (name: string, id?: string) => Promise<string | boolean>;

const useIsUnique = (): UseIsUniqueReturn => {
  const { accounts } = useSupabaseClient();

  return useCallback(
    async (name: string, id?: string) => {
      const data = await accounts.getAll({
        filtering: (q) => {
          const filtered = q.eq('name', name).is('archivedAt', null);
          return id ? filtered.neq('id', id) : filtered;
        },
      });

      if (data.length > 0) return es.account.toast.uniqueError;
      return true;
    },
    [accounts],
  );
};

export default useIsUnique;
