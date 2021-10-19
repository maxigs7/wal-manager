import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux';
import {
  CREDIT_CARDS_REQUEST_REFRESH,
  CREDIT_CARD_REMOVE_REQUEST,
  CREDIT_CARD_RESET,
  selectFormSubmission,
} from '@app/stores/credit-cards';
import { AsyncStatus } from '@app/stores/state';

interface IDispatch {
  onCreditCardRemove(id: string): void;
  onCreditCardsRefresh(): void;
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

  const onCreditCardRemove = useCallback((id: string) => {
    dispatch(CREDIT_CARD_REMOVE_REQUEST(id));
  }, []);

  const onCreditCardsRefresh = useCallback(() => {
    dispatch(CREDIT_CARDS_REQUEST_REFRESH());
  }, []);

  const onFormReset = useCallback(() => {
    dispatch(CREDIT_CARD_RESET());
  }, []);

  return useMemo(
    () => ({
      dispatch: {
        onCreditCardRemove,
        onCreditCardsRefresh,
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
