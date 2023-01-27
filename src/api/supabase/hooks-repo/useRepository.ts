import { useMemo } from 'react';

import { FunctionsArgs, FunctionsName, TablesName } from '@models';

import {
  useDelete,
  UseDeleteReturn,
  useDeleteById,
  UseDeleteByIdReturn,
  useInsert,
  UseInsertReturn,
  useSelect,
  UseSelectReturn,
  useSelectById,
  UseSelectByIdReturn,
  useUpdate,
  UseUpdateReturn,
  UseRpcReturn,
  useRpc,
} from '../hooks-actions';

export type UseRpcRepositoryReturn<FName extends FunctionsName, TResult> = (
  args: FunctionsArgs<FName>,
) => Promise<TResult>;

export type UseRepositoryReturn<TName extends TablesName> = {
  insert: UseInsertReturn<TName>;
  remove: UseDeleteReturn<TName>;
  removeById: UseDeleteByIdReturn<TName>;
  select: UseSelectReturn<TName>;
  selectById: UseSelectByIdReturn<TName>;
  update: UseUpdateReturn<TName>;
  rpc: UseRpcReturn;
};

export const useRepository = <TName extends TablesName>(
  table: TablesName,
): UseRepositoryReturn<TName> => {
  const deleteFn = useDelete<TName>(table);
  const deleteById = useDeleteById<TName>(table);
  const insert = useInsert<TName>(table);
  const rpc = useRpc();
  const select = useSelect<TName>(table);
  const selectById = useSelectById<TName>(table);
  const update = useUpdate<TName>(table);

  return useMemo(
    () => ({
      insert,
      remove: deleteFn,
      removeById: deleteById,
      rpc,
      select,
      selectById,
      update,
    }),
    [deleteById, deleteFn, insert, rpc, select, selectById, update],
  );
};
