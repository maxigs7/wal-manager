import { SupabaseError, Count, Returning } from '@/lib/supabase';
import { TablesName, Updates, Rows, WalManagerSupabase } from '@/models';

export type UpdateReturn<TName extends TablesName> = (
  model: Partial<Updates<TName>>,
) => Promise<Rows<TName>>;

export type UpdateOptions = {
  count?: Count;
  returning?: Returning;
};

export const update = <TName extends TablesName>(
  supabase: WalManagerSupabase,
  table: TablesName,
  options: UpdateOptions = {},
): UpdateReturn<TName> => {
  return async (model: Partial<Updates<TName>>) => {
    const query = supabase.from(table).update(model, options).match({ id: model.id });
    const { data, error } = await query.select<string, Rows<TName>>();

    if (error) {
      throw new SupabaseError(error);
    }

    return data[0];
  };
};
