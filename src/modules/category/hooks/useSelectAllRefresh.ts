import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { CATEGORIES_KEY } from '../constants';

const useSelectAllRefresh = (): ((id?: string) => void) => {
  const queryClient = useQueryClient();

  return useCallback(
    (id?: string) => {
      queryClient.resetQueries([CATEGORIES_KEY], { exact: true }, { cancelRefetch: true });
      id && queryClient.removeQueries([CATEGORIES_KEY, id], { exact: true });
    },
    [queryClient],
  );
};

export default useSelectAllRefresh;
