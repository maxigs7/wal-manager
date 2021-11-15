import { useCallback, useMemo, useReducer } from 'react';

import { useSubCategoriesRefresh } from '@api';
import { Category } from '@models';

import { openForm, openFormDismiss, openFormSuccess } from './actions';
import { reducer } from './reducer';
import { IDispatch, initialState, IState } from './state';

export const useStore = (): [IState, IDispatch] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const refresh = useSubCategoriesRefresh();

  const onOpenForm = useCallback((id?: string, isDeleting = false) => {
    dispatch(openForm({ isDeleting, id }));
  }, []);

  const onConfirmedForm = useCallback(
    (category: Category) => {
      dispatch(openFormSuccess(category));
      refresh(category);
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
