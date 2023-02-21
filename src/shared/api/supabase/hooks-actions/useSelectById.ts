import { Rows, TablesName } from '@/models';
import { NotFoundError } from '@/shared/errors';

import { useSelect, UseSelectOptions } from './useSelect';

export type UseSelectByIdReturn<TName extends TablesName> = (
  id: string,
  config?: UseSelectByIdConfig,
) => Promise<Rows<TName>>;

export type UseSelectByIdConfig = {
  columns?: string;
  options?: UseSelectOptions;
};

export const useSelectById = <TName extends TablesName>(
  table: TablesName,
): UseSelectByIdReturn<TName> => {
  const select = useSelect<TName>(table);
  return async (id: string, config?: UseSelectByIdConfig) => {
    const [row] = await select({ ...config, filter: (q) => q.eq('id', id) });

    if (!row) {
      throw new NotFoundError('Not Found Error', id);
    }

    return row;
  };
};
