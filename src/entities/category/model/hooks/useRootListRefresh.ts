import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { CategoryType } from '@entities';

import { CATEGORIES_KEY } from '../../config/constants';

const hook = (): ((type: CategoryType, id?: string) => void) => {
  const queryClient = useQueryClient();

  return useCallback(
    (type: CategoryType, id?: string) => {
      queryClient.resetQueries(
        [CATEGORIES_KEY, 'root', type],
        { exact: true },
        { cancelRefetch: true },
      );
      id && queryClient.removeQueries([CATEGORIES_KEY, id], { exact: true });
    },
    [queryClient],
  );
};

export default hook;
