import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux';
import { CreditCard } from '@app/models/credit-cards';
import {
  CREDIT_CARDS_REQUEST,
  CREDIT_CARDS_REQUEST_REFRESH,
  CREDIT_CARD_SELECTED,
  selectCreditCards,
  selectSelected,
} from '@app/stores/credit-cards';

interface IDispatch {
  onCreditCardsRefresh(): void;
  onCreditCardsRequest(): void;
  onCreditCardSelected(creditCard: CreditCard): void;
}

interface IState {
  creditCards: CreditCard[];
  isLoading: boolean;
  selected?: CreditCard;
  userId?: string;
}

interface IReduxReturn {
  dispatch: IDispatch;
  state: IState;
}

export const useRedux = (): IReduxReturn => {
  const { data: creditCards, isLoading } = useAppSelector(selectCreditCards);
  const selected = useAppSelector(selectSelected);
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  const onCreditCardSelected = useCallback((creditCard: CreditCard) => {
    dispatch(CREDIT_CARD_SELECTED(creditCard));
  }, []);

  const onCreditCardsRequest = useCallback(() => {
    dispatch(CREDIT_CARDS_REQUEST());
  }, []);

  const onCreditCardsRefresh = useCallback(() => {
    dispatch(CREDIT_CARDS_REQUEST_REFRESH());
  }, []);

  return useMemo(
    () => ({
      dispatch: {
        onCreditCardsRefresh,
        onCreditCardsRequest,
        onCreditCardSelected,
      },
      state: {
        creditCards: creditCards || [],
        isLoading,
        selected,
        userId,
      },
    }),
    [creditCards, isLoading, userId],
  );
};
