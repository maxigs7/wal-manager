import { useCallback } from 'react';

import { useSupabaseClient } from '@api';
import { es } from '@i18n';

type UseIsUniqueReturn = (name: string, id?: string) => Promise<string | boolean>;

const useIsUnique = (): UseIsUniqueReturn => {
  const { creditCards } = useSupabaseClient();

  return useCallback(
    async (name: string, id?: string) => {
      const data = await creditCards.getAll({
        filtering: (q) => {
          const filtered = q.eq('name', name).is('archivedAt', null);
          return id ? filtered.neq('id', id) : filtered;
        },
      });

      if (data.length > 0) return es.creditCard.toast.uniqueError;
      return true;
    },
    [creditCards],
  );
};

export default useIsUnique;
