import { SupabaseError, Count, Returning } from '@/lib/supabase';
import { Inserts, Rows, TablesName, WalManagerSupabase } from '@/models';

export type InsertReturn<TName extends TablesName> = (
  model: Inserts<TName> | Inserts<TName>[],
) => Promise<Rows<TName>>;

export type InsertOptions = {
  count?: Count;
  returning?: Returning;
};

export const insert = <TName extends TablesName>(
  supabase: WalManagerSupabase,
  table: TablesName,
  options: InsertOptions = {},
): InsertReturn<TName> => {
  return async (model: Inserts<TName> | Inserts<TName>[]) => {
    const { data, error } = await supabase
      .from(table)
      .insert<Inserts<TName>>(model, options)
      .select<string, Rows<TName>>();

    if (error) {
      throw new SupabaseError(error);
    }

    return data[0];
  };
};
