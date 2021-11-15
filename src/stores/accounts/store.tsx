import { useCallback, useMemo, useReducer } from 'react';

import { useAccountRefresh } from '@api';
import { Account } from '@models';

import { openForm, openFormDismiss, openFormSuccess } from './actions';
import { reducer } from './reducer';
import { IDispatch, initialState, IState } from './state';

export const useStore = (): [IState, IDispatch] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const refresh = useAccountRefresh();
  const onOpenForm = useCallback((account?: Account, isDeleting = false) => {
    dispatch(openForm({ id: account?.id, isDeleting }));
  }, []);

  const onConfirmedForm = useCallback(
    (account: Account) => {
      dispatch(openFormSuccess(account));
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
