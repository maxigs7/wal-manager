import { SupabaseError, Count, Filter, Sort } from '@/lib/supabase';
import { Rows, TablesName, WalManagerSupabase } from '@/models';

export type SelectReturn<TName extends TablesName> = (
  config?: SelectConfig<TName>,
) => Promise<Rows<TName>[]>;

export type SelectOptions = {
  count?: Count;
  head?: boolean;
};

export type SelectConfig<TName extends TablesName> = {
  columns?: string;
  filter?: Filter<TName, Rows<TName>> | false | null;
  order?: Sort;
  options?: SelectOptions;
};

export const select = <TName extends TablesName>(
  supabase: WalManagerSupabase,
  table: TablesName,
): SelectReturn<TName> => {
  return async (config?: SelectConfig<TName>) => {
    const query = supabase
      .from(table)
      .select<string, Rows<TName>>(config?.columns || '*', config?.options);

    const queryFiltered = config?.filter ? config.filter(query) : query;
    const querySorted = config?.order
      ? queryFiltered.order(config.order.field, {
          ascending: config.order.ascending || true,
          foreignTable: config.order.foreignTable || '',
        })
      : queryFiltered;

    const { data, error } = await querySorted;
    if (error) {
      throw new SupabaseError(error);
    }

    return data;
  };
};
