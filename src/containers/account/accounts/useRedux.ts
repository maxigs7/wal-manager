import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux';
import { Account } from '@app/models/accounts';
import { ACCOUNTS_REQUEST, ACCOUNTS_REQUEST_REFRESH, selectAccounts } from '@app/stores/accounts';

interface IDispatch {
  onAccountsRefresh(): void;
  onAccountsRequest(): void;
}

interface IState {
  accounts: Account[];
  isLoading: boolean;
  userId?: string;
}

interface IReduxReturn {
  dispatch: IDispatch;
  state: IState;
}

export const useRedux = (): IReduxReturn => {
  const { data: accounts, isLoading } = useAppSelector(selectAccounts);
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  const onAccountsRequest = useCallback(() => {
    dispatch(ACCOUNTS_REQUEST());
  }, []);

  const onAccountsRefresh = useCallback(() => {
    dispatch(ACCOUNTS_REQUEST_REFRESH());
  }, []);

  return useMemo(
    () => ({
      dispatch: {
        onAccountsRefresh,
        onAccountsRequest,
      },
      state: {
        accounts: accounts || [],
        isLoading,
        userId,
      },
    }),
    [accounts, isLoading, userId],
  );
};
