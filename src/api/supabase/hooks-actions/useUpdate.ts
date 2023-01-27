import { useCallback } from 'react';

import { ApiError, Count, Returning, useSupabase } from '@/lib';
import { TablesName, Updates, Rows } from '@/models';

export type UseUpdateReturn<TName extends TablesName> = (
  model: Partial<Updates<TName>>,
) => Promise<Rows<TName>>;

export type UseUpdateOptions = {
  count?: Count;
  returning?: Returning;
};

export const useUpdate = <TName extends TablesName>(
  table: TablesName,
  options: UseUpdateOptions = {},
): UseUpdateReturn<TName> => {
  const supabase = useSupabase();

  return useCallback(
    async (model: Partial<Updates<TName>>) => {
      const query = supabase.from(table).update(model, options).match({ id: model.id });
      const { data, error } = await query.select<string, Rows<TName>>();

      if (error) {
        throw new ApiError(error);
      }

      return data[0];
    },
    [options, supabase, table],
  );
};
