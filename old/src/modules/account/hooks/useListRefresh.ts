import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { ACCOUNTS_KEY } from '../constants';

const hook = (): ((id?: string) => void) => {
  const queryClient = useQueryClient();

  return useCallback(
    (id?: string) => {
      queryClient.resetQueries([ACCOUNTS_KEY], { exact: true }, { cancelRefetch: true });
      id && queryClient.removeQueries([ACCOUNTS_KEY, id], { exact: true });
    },
    [queryClient],
  );
};

export default hook;
