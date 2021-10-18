import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux';
import { Account } from '@app/models/accounts';
import {
  ACCOUNTS_REQUEST,
  ACCOUNTS_REQUEST_REFRESH,
  ACCOUNT_SELECTED,
  selectAccounts,
  selectSelected,
} from '@app/stores/accounts';

interface IDispatch {
  onAccountsRefresh(): void;
  onAccountsRequest(): void;
  onAccountSelected(account: Account): void;
}

interface IState {
  accounts: Account[];
  isLoading: boolean;
  selected?: Account;
  userId?: string;
}

interface IReduxReturn {
  dispatch: IDispatch;
  state: IState;
}

export const useRedux = (): IReduxReturn => {
  const { data: accounts, isLoading } = useAppSelector(selectAccounts);
  const selected = useAppSelector(selectSelected);
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  const onAccountSelected = useCallback((account: Account) => {
    dispatch(ACCOUNT_SELECTED(account));
  }, []);

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
        onAccountSelected,
      },
      state: {
        accounts: accounts || [],
        isLoading,
        selected,
        userId,
      },
    }),
    [accounts, isLoading, userId],
  );
};
