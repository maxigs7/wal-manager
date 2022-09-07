import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { CategoryType } from '@models';

import { CATEGORIES_KEY } from '../constants';

const useRowsRefresh = (): ((type: CategoryType, id?: string) => void) => {
  const queryClient = useQueryClient();

  return useCallback(
    (type: CategoryType, id?: string) => {
      queryClient.resetQueries(
        [CATEGORIES_KEY, 'rows', type],
        { exact: true },
        { cancelRefetch: true },
      );
      queryClient.resetQueries(
        [CATEGORIES_KEY, 'lookup'],
        { exact: true },
        { cancelRefetch: true },
      );
      id && queryClient.removeQueries([CATEGORIES_KEY, id], { exact: true });
    },
    [queryClient],
  );
};

export default useRowsRefresh;
