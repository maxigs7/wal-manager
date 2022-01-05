import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { TRANSACTIONS_KEY } from '../../config/constants';

const hook = (): (() => void) => {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.resetQueries([TRANSACTIONS_KEY], { exact: false }, { cancelRefetch: true });
  }, [queryClient]);
};

export default hook;
