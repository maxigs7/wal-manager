import { SupabaseNotFoundError } from '@/lib/supabase';
import { Rows, TablesName, WalManagerSupabase } from '@/models';

import { select, SelectOptions } from './select';

export type SelectByIdReturn<TName extends TablesName> = (
  id: string,
  config?: SelectByIdConfig,
) => Promise<Rows<TName>>;

export type SelectByIdConfig = {
  columns?: string;
  options?: SelectOptions;
};

export const selectById = <TName extends TablesName>(
  supabase: WalManagerSupabase,
  table: TablesName,
): SelectByIdReturn<TName> => {
  const selectFn = select<TName>(supabase, table);
  return async (id: string, config?: SelectByIdConfig) => {
    const [row] = await selectFn({ ...config, filter: (q) => q.eq('id', id) });

    if (!row) {
      throw new SupabaseNotFoundError(`${table}: ${id}`, id);
    }

    return row;
  };
};
