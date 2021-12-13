import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { CATEGORIES_KEY, SUB_CATEGORIES_KEY } from '../../config/constants';

export default (): ((parentId: string, id?: string) => void) => {
  const queryClient = useQueryClient();

  return useCallback(
    (parentId?: string, id?: string) => {
      queryClient.resetQueries(
        [CATEGORIES_KEY, SUB_CATEGORIES_KEY, parentId],
        { exact: true },
        { cancelRefetch: true },
      );
      id && queryClient.removeQueries([CATEGORIES_KEY, id], { exact: true });
    },
    [queryClient],
  );
};
