import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux';
import { CreditCard } from '@app/models/credit-cards';
import {
  CREDIT_CARDS_REQUEST_REFRESH,
  CREDIT_CARD_CREATE_REQUEST,
  CREDIT_CARD_REQUEST,
  CREDIT_CARD_RESET,
  CREDIT_CARD_UPDATE_REQUEST,
  selectCreditCard,
  selectFormSubmission,
} from '@app/stores/credit-cards';
import { AsyncStatus } from '@app/stores/state';

interface IDispatch {
  onCreditCardCreate(model: CreditCard): void;
  onCreditCardRequest(id: string): void;
  onCreditCardUpdate(model: CreditCard): void;
  onCreditCardsRefresh(): void;
  onFormReset(): void;
}

interface IState {
  creditCard?: CreditCard;
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
  const { data: creditCard, isLoading } = useAppSelector(selectCreditCard);
  const {
    data: idSaved,
    isLoading: isSubmitting,
    status: submissionStatus,
  } = useAppSelector(selectFormSubmission);

  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  const onCreditCardCreate = useCallback((model: CreditCard) => {
    dispatch(CREDIT_CARD_CREATE_REQUEST(model));
  }, []);

  const onCreditCardUpdate = useCallback((model: CreditCard) => {
    dispatch(CREDIT_CARD_UPDATE_REQUEST(model));
  }, []);

  const onCreditCardRequest = useCallback((id: string) => {
    dispatch(CREDIT_CARD_REQUEST(id));
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
        onCreditCardCreate,
        onCreditCardRequest,
        onCreditCardUpdate,
        onCreditCardsRefresh,
        onFormReset,
      },
      state: {
        creditCard,
        idSaved,
        isLoading,
        isSubmitting,
        submissionStatus,
        userId,
      },
    }),
    [creditCard, idSaved, isLoading, isSubmitting, submissionStatus, userId],
  );
};
