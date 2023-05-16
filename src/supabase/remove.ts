import { SupabaseError, Count, Filter, Returning, SupabaseNotFoundError } from '@/lib/supabase';
import { Rows, TablesName, WalManagerSupabase } from '@/models';

export type RemoveReturn<TName extends TablesName> = (
  filter: Filter<TName, Rows<TName>, undefined>,
) => Promise<Rows<TName>>;

export type RemoveOptions = {
  count?: Count;
  returning?: Returning;
};

export const remove = <TName extends TablesName>(
  supabase: WalManagerSupabase,
  table: TablesName,
  options: RemoveOptions = {},
): RemoveReturn<TName> => {
  return async (filter: Filter<TName, Rows<TName>, undefined>) => {
    const query = supabase.from(table).delete(options);
    const { data, error } = await filter(query).select<string, Rows<TName>>();

    if (error) {
      throw new SupabaseError(error);
    }
    if (!data) {
      throw new SupabaseNotFoundError(`${table}: Not Found`);
    }

    return data[0];
  };
};
