import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { TRANSACTIONS_KEY } from '../constants';

const useListRefresh = (): (() => void) => {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.resetQueries([TRANSACTIONS_KEY], { exact: false }, { cancelRefetch: true });
  }, [queryClient]);
};

export default useListRefresh;
