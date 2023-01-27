import { useCallback } from 'react';

import { ApiError, Count, Filter, Returning, useSupabase } from '@lib';
import { Rows, TablesName } from '@models';

export type UseDeleteReturn<TName extends TablesName> = (
  filter: Filter<TName, Rows<TName>, undefined>,
) => Promise<Rows<TName>>;

export type UseDeleteOptions = {
  count?: Count;
  returning?: Returning;
};

export const useDelete = <TName extends TablesName>(
  table: TablesName,
  options: UseDeleteOptions = {},
): UseDeleteReturn<TName> => {
  const supabase = useSupabase();

  return useCallback(
    async (filter: Filter<TName, Rows<TName>, undefined>) => {
      const query = supabase.from(table).delete(options);
      const { data, error } = await filter(query).select<string, Rows<TName>>();

      if (error) {
        throw new ApiError(error);
      }
      if (!data) {
        throw new Error('Not Found');
      }

      return data[0];
    },
    [options, supabase, table],
  );
};
