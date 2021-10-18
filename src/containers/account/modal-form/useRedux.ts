import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux';
import { Account } from '@app/models/accounts';
import {
  ACCOUNTS_REQUEST_REFRESH,
  ACCOUNT_CREATE_REQUEST,
  ACCOUNT_REQUEST,
  ACCOUNT_RESET,
  ACCOUNT_UPDATE_REQUEST,
  selectAccount,
  selectFormSubmission,
} from '@app/stores/accounts';
import { AsyncStatus } from '@app/stores/state';

interface IDispatch {
  onAccountCreate(model: Account): void;
  onAccountRequest(id: string): void;
  onAccountUpdate(model: Account): void;
  onAccountsRefresh(): void;
  onFormReset(): void;
}

interface IState {
  account?: Account;
  idSaved?: string;
  isLoading: boolean;
  isSubmitting: boolean;
  submissionStatus: AsyncStatus;
  userId?: string;
}

interface IReduxReturn {
  dispatch: IDispatch;
  state: IState;
}

export const useRedux = (): IReduxReturn => {
  const { data: account, isLoading } = useAppSelector(selectAccount);
  const {
    data: idSaved,
    isLoading: isSubmitting,
    status: submissionStatus,
  } = useAppSelector(selectFormSubmission);

  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  const onAccountCreate = useCallback((model: Account) => {
    dispatch(ACCOUNT_CREATE_REQUEST(model));
  }, []);

  const onAccountUpdate = useCallback((model: Account) => {
    dispatch(ACCOUNT_UPDATE_REQUEST(model));
  }, []);

  const onAccountRequest = useCallback((id: string) => {
    dispatch(ACCOUNT_REQUEST(id));
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
        onAccountCreate,
        onAccountRequest,
        onAccountUpdate,
        onAccountsRefresh,
        onFormReset,
      },
      state: {
        account,
        idSaved,
        isLoading,
        isSubmitting,
        submissionStatus,
        userId,
      },
    }),
    [account, idSaved, isLoading, isSubmitting, submissionStatus, userId],
  );
};
