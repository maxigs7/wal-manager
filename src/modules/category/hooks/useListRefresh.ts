import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { CategoryType } from '@models';

import { CATEGORIES_KEY } from '../constants';

const hook = (): ((type: CategoryType) => void) => {
  const queryClient = useQueryClient();

  return useCallback(
    (type: CategoryType) => {
      queryClient.resetQueries([CATEGORIES_KEY, type], { exact: true }, { cancelRefetch: true });
    },
    [queryClient],
  );
};

export default hook;
