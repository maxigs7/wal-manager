import { FunctionsArgs, FunctionsName, TablesName } from '@/models';

import {
  useSelect,
  UseSelectReturn,
  useSelectById,
  UseSelectByIdReturn,
  UseRpcReturn,
  useRpc,
} from '../../hooks-actions/server';

export type UseRpcRepositoryReturn<FName extends FunctionsName, TResult> = (
  args: FunctionsArgs<FName>,
) => Promise<TResult>;

export type UseRepositoryReturn<TName extends TablesName> = {
  select: UseSelectReturn<TName>;
  selectById: UseSelectByIdReturn<TName>;
  rpc: UseRpcReturn;
};

export const useRepository = <TName extends TablesName>(
  table: TablesName,
): UseRepositoryReturn<TName> => {
  const rpc = useRpc();
  const select = useSelect<TName>(table);
  const selectById = useSelectById<TName>(table);

  return {
    rpc,
    select,
    selectById,
  };
};
