import { useCallback } from 'react';

import { ApiError, Count, Filter, Sort, useSupabase } from '@lib';
import { Rows, TablesName } from '@models';

export type UseSelectReturn<TName extends TablesName> = (
  config?: UseSelectConfig<TName>,
) => Promise<Rows<TName>[]>;

export type UseSelectOptions = {
  count?: Count;
  head?: boolean;
};

export type UseSelectConfig<TName extends TablesName> = {
  columns?: string;
  filter?: Filter<TName, Rows<TName>> | false | null;
  order?: Sort;
  options?: UseSelectOptions;
};

export const useSelect = <TName extends TablesName>(table: TablesName): UseSelectReturn<TName> => {
  const supabase = useSupabase();

  return useCallback(
    async (config?: UseSelectConfig<TName>) => {
      const query = supabase
        .from(table)
        .select<string, Rows<TName>>(config?.columns, config?.options);

      const queryFiltered = config?.filter ? config.filter(query) : query;
      const querySorted = config?.order
        ? queryFiltered.order(config.order.field, {
            ascending: config.order.ascending || true,
            foreignTable: config.order.foreignTable || '',
          })
        : queryFiltered;

      const { data, error } = await querySorted;
      if (error) {
        throw new ApiError(error);
      }

      return data;
    },
    [supabase, table],
  );
};
