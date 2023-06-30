import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { CATEGORIES_KEY } from '../constants';

type UseSelectAllRefresh = () => (categoryId?: string) => void;

const useSelectAllRefresh: UseSelectAllRefresh = (): ((categoryId?: string) => void) => {
  const queryCache = useQueryClient();

  const resetCategories = useCallback(() => {
    queryCache.resetQueries([CATEGORIES_KEY], { exact: true }, { cancelRefetch: true });
  }, [queryCache]);

  const removeCategory = useCallback(
    (categoryId: string) => {
      queryCache.removeQueries([CATEGORIES_KEY, categoryId], { exact: true });
    },
    [queryCache],
  );

  return useCallback(
    (categoryId?: string) => {
      resetCategories();
      categoryId && removeCategory(categoryId);
    },
    [resetCategories, removeCategory],
  );
};

export default useSelectAllRefresh;
