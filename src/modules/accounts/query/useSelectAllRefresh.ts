import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { ACCOUNTS_KEY } from '../constants';

type UseSelectAllRefresh = () => (accountId?: string) => void;

const useSelectAllRefresh: UseSelectAllRefresh = (): ((accountId?: string) => void) => {
  const queryCache = useQueryClient();

  const resetAccounts = useCallback(() => {
    queryCache.resetQueries([ACCOUNTS_KEY], { exact: true }, { cancelRefetch: true });
  }, [queryCache]);

  const removeAccount = useCallback(
    (accountId: string) => {
      queryCache.removeQueries([ACCOUNTS_KEY, accountId], { exact: true });
    },
    [queryCache],
  );

  return useCallback(
    (accountId?: string) => {
      resetAccounts();
      accountId && removeAccount(accountId);
    },
    [resetAccounts, removeAccount],
  );
};

export default useSelectAllRefresh;
