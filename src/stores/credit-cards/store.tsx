import { useCallback, useMemo, useReducer } from 'react';

import { useCreditCardRefresh } from '@api';
import { CreditCard } from '@models';

import { openForm, openFormDismiss, openFormSuccess } from './actions';
import { reducer } from './reducer';
import { IDispatch, initialState, IState } from './state';

export const useStore = (): [IState, IDispatch] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const refresh = useCreditCardRefresh();
  const onOpenForm = useCallback((cc?: CreditCard, isDeleting = false) => {
    dispatch(openForm({ id: cc?.id, isDeleting }));
  }, []);

  const onConfirmedForm = useCallback(
    (cc: CreditCard) => {
      dispatch(openFormSuccess(cc));
      refresh();
    },
    [dispatch],
  );

  const onDismissForm = useCallback(() => {
    dispatch(openFormDismiss());
  }, [dispatch]);

  return useMemo(
    () => [
      state,
      {
        onConfirmedForm,
        onDismissForm,
        onOpenForm,
      },
    ],
    [state],
  );
};
