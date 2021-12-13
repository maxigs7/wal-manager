import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { CategoryType } from '@entities';

import { CATEGORIES_KEY } from '../../config/constants';

export default (): ((type: CategoryType) => void) => {
  const queryClient = useQueryClient();

  return useCallback(
    (type: CategoryType) => {
      queryClient.resetQueries([CATEGORIES_KEY, type], { exact: true }, { cancelRefetch: true });
    },
    [queryClient],
  );
};
