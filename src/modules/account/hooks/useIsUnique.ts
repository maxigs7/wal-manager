import { useCallback } from 'react';

import { useUow } from '@api';
import { es } from '@i18n';

type UseIsUniqueReturn = (name: string, id?: string) => Promise<string | boolean>;

const useIsUnique = (): UseIsUniqueReturn => {
  const { account } = useUow();

  return useCallback(
    async (name: string, id?: string) => {
      const data = await account.select({
        filter: (query) => {
          const filtered = query.eq('name', name);
          return id ? filtered.neq('id', id) : filtered;
        },
      });

      if (data.length > 0) return es.account.toast.uniqueError;
      return true;
    },
    [account],
  );
};

export default useIsUnique;
