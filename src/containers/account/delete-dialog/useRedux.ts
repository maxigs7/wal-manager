import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux';
import {
  ACCOUNTS_REQUEST_REFRESH,
  ACCOUNT_REMOVE_REQUEST,
  ACCOUNT_RESET,
  selectFormSubmission,
} from '@app/stores/accounts';
import { AsyncStatus } from '@app/stores/state';

interface IDispatch {
  onAccountRemove(id: string): void;
  onAccountsRefresh(): void;
  onFormReset(): void;
}

interface IState {
  isLoading: boolean;
  status: AsyncStatus;
}

interface IReduxReturn {
  dispatch: IDispatch;
  state: IState;
}

export const useRedux = (): IReduxReturn => {
  const { isLoading, status } = useAppSelector(selectFormSubmission);

  const dispatch = useAppDispatch();

  const onAccountRemove = useCallback((id: string) => {
    dispatch(ACCOUNT_REMOVE_REQUEST(id));
  }, []);

  const onAccountsRefresh = useCallback(() => {
    dispatch(ACCOUNTS_REQUEST_REFRESH());
  }, []);

  const onFormReset = useCallback(() => {
    dispatch(ACCOUNT_RESET());
  }, []);

  return useMemo(
    () => ({
      dispatch: {
        onAccountRemove,
        onAccountsRefresh,
        onFormReset,
      },
      state: {
        isLoading,
        status,
      },
    }),
    [isLoading],
  );
};
