import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { MOVEMENTS_KEY, MOVEMENTS_SUMMARY_KEY } from '../constants';

type UseSelectSummaryRefreshReturn = (accountId: string, month: number, year: number) => void;

const useSelectSummaryRefresh = (): UseSelectSummaryRefreshReturn => {
  const queryClient = useQueryClient();

  return useCallback(
    (accountId, month, year) => {
      queryClient.resetQueries(
        [MOVEMENTS_KEY, MOVEMENTS_SUMMARY_KEY, accountId, month, year],
        { exact: true },
        { cancelRefetch: true },
      );
    },
    [queryClient],
  );
};

export default useSelectSummaryRefresh;
