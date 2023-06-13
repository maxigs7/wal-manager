import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { ACCOUNTS_KEY } from '../constants';

type UseSelectAllRefresh = () => (accountId?: string) => void;

const useSelectAllRefresh: UseSelectAllRefresh = (): ((accountId?: string) => void) => {
  const { resetQueries, removeQueries } = useQueryClient();

  const resetAccounts = useCallback(() => {
    resetQueries([ACCOUNTS_KEY], { exact: true }, { cancelRefetch: true });
  }, [resetQueries]);

  const removeAccount = useCallback(
    (accountId: string) => {
      removeQueries([ACCOUNTS_KEY, accountId], { exact: true });
    },
    [removeQueries],
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
