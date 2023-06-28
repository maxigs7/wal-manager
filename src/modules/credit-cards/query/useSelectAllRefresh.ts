import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { CREDIT_CARDS_KEY } from '../constants';

type UseSelectAllRefresh = () => (creditCardId?: string) => void;

const useSelectAllRefresh: UseSelectAllRefresh = (): ((creditCardId?: string) => void) => {
  const queryCache = useQueryClient();

  const resetCreditCards = useCallback(() => {
    queryCache.resetQueries([CREDIT_CARDS_KEY], { exact: true }, { cancelRefetch: true });
  }, [queryCache]);

  const removeCreditCard = useCallback(
    (creditCardId: string) => {
      queryCache.removeQueries([CREDIT_CARDS_KEY, creditCardId], { exact: true });
    },
    [queryCache],
  );

  return useCallback(
    (creditCardId?: string) => {
      resetCreditCards();
      creditCardId && removeCreditCard(creditCardId);
    },
    [resetCreditCards, removeCreditCard],
  );
};

export default useSelectAllRefresh;
