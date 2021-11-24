import { useCallback, useMemo, useReducer } from 'react';

import { useTransactionRefresh } from '@api';
import { Transaction, TransactionType } from '@models';

import { changeMonth, changeYear, openForm, openFormDismiss, openFormSuccess } from './actions';
import { reducer } from './reducer';
import { IDispatch, initialState, IState } from './state';

export const useStore = (): [IState, IDispatch] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const refresh = useTransactionRefresh();

  const onChangedMonth = useCallback(
    (month: number) => {
      dispatch(changeMonth(month));
    },
    [dispatch],
  );

  const onChangedYear = useCallback(
    (year: number) => {
      dispatch(changeYear(year));
    },
    [dispatch],
  );

  const onConfirmedForm = useCallback(
    (transaction: Transaction) => {
      dispatch(openFormSuccess(transaction));
      refresh();
    },
    [dispatch],
  );

  const onDismissForm = useCallback(() => {
    dispatch(openFormDismiss());
  }, [dispatch]);

  const onOpenForm = useCallback((type: TransactionType, id?: string, isDeleting = false) => {
    dispatch(openForm({ isDeleting, id, type }));
  }, []);

  return useMemo(
    () => [
      state,
      {
        onChangedMonth,
        onChangedYear,
        onConfirmedForm,
        onDismissForm,
        onOpenForm,
      },
    ],
    [state],
  );
};
