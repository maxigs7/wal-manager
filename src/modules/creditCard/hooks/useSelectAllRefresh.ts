import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { CREDIT_CARDS_KEY } from '../constants';

const useSelectAllRefresh = (): ((id?: string) => void) => {
  const queryClient = useQueryClient();

  return useCallback(
    (id?: string) => {
      queryClient.resetQueries([CREDIT_CARDS_KEY], { exact: true }, { cancelRefetch: true });
      id && queryClient.removeQueries([CREDIT_CARDS_KEY, id], { exact: true });
    },
    [queryClient],
  );
};

export default useSelectAllRefresh;
