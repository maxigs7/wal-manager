import { useCallback } from 'react';

import { useUow } from '@/api';
import { es } from '@/i18n';

type UseIsUniqueReturn = (name: string, id?: string) => Promise<string | boolean>;

const useIsUnique = (): UseIsUniqueReturn => {
  const { creditCard } = useUow();

  return useCallback(
    async (name: string, id?: string) => {
      const data = await creditCard.select({
        filter: (query) => {
          const filtered = query.eq('name', name);
          return id ? filtered.neq('id', id) : filtered;
        },
      });

      if (data.length > 0) return es.creditCard.toast.uniqueError;
      return true;
    },
    [creditCard],
  );
};

export default useIsUnique;
