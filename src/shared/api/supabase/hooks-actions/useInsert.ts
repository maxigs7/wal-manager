import { useCallback } from 'react';

import { SupabaseError, Count, Returning, useSupabase } from '@/lib/supabase';
import { Inserts, Rows, TablesName } from '@/models';

export type UseInsertReturn<TName extends TablesName> = (
  model: Inserts<TName> | Inserts<TName>[],
) => Promise<Rows<TName>>;

export type UseInsertOptions = {
  count?: Count;
  returning?: Returning;
};

export const useInsert = <TName extends TablesName>(
  table: TablesName,
  options: UseInsertOptions = {},
): UseInsertReturn<TName> => {
  const { supabase } = useSupabase();

  return useCallback(
    async (model: Inserts<TName> | Inserts<TName>[]) => {
      const { data, error } = await supabase
        .from(table)
        .insert<Inserts<TName>>(model, options)
        .select<string, Rows<TName>>();

      if (error) {
        throw new SupabaseError(error);
      }

      return data[0];
    },
    [options, supabase, table],
  );
};
