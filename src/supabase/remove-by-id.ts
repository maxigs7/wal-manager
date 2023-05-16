import { Rows, TablesName, WalManagerSupabase } from '@/models';

import { remove, RemoveOptions } from './remove';

export type RemoveByIdReturn<TName extends TablesName> = (id: string) => Promise<Rows<TName>>;

export const removeById = <TName extends TablesName>(
  supabase: WalManagerSupabase,
  table: TablesName,
  options: RemoveOptions = {},
): RemoveByIdReturn<TName> => {
  const deleteFn = remove<TName>(supabase, table, options);
  return (id: string) => {
    return deleteFn((query) => query.match({ id }));
  };
};
