import { useCallback } from 'react';

import { Rows, TablesName } from '@/models';

import { useDelete, UseDeleteOptions } from './useDelete';

export type UseDeleteByIdReturn<TName extends TablesName> = (id: string) => Promise<Rows<TName>>;

export const useDeleteById = <TName extends TablesName>(
  table: TablesName,
  options: UseDeleteOptions = {},
): UseDeleteByIdReturn<TName> => {
  const deleteFn = useDelete<TName>(table, options);

  return useCallback(
    (id: string) => {
      return deleteFn((query) => query.match({ id }));
    },
    [deleteFn],
  );
};
