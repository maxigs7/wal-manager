import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { MOVEMENTS_GRID_KEY, MOVEMENTS_KEY } from '../constants';

type UseSelectAllRefreshReturn = (
  accountId: string,
  month: number,
  year: number,
  id?: string,
) => void;

const useSelectAllRefresh = (): UseSelectAllRefreshReturn => {
  const queryClient = useQueryClient();

  return useCallback(
    (accountId, month, year, id?: string) => {
      queryClient.resetQueries(
        [MOVEMENTS_KEY, MOVEMENTS_GRID_KEY, accountId, month, year],
        { exact: true },
        { cancelRefetch: true },
      );
      id && queryClient.removeQueries([MOVEMENTS_KEY, id], { exact: true });
    },
    [queryClient],
  );
};

export default useSelectAllRefresh;
