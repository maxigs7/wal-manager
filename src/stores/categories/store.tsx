import { useCallback, useMemo, useReducer } from 'react';

import { Category } from '@models';
import { CategoryType } from '@models/common';

import { openForm, openFormDismiss, openFormSuccess, selected, selectedType } from './actions';
import { reducer } from './reducer';
import { IDispatch, initialState, IState } from './state';

export const useStore = (): [IState, IDispatch] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSelected = useCallback(
    (category: Category) => {
      dispatch(selected(category));
    },
    [dispatch],
  );

  const onSelectedType = useCallback(
    (type: CategoryType) => {
      dispatch(selectedType(type));
    },
    [dispatch],
  );

  const onOpenForm = useCallback((type: CategoryType, id?: string, isDeleting = false) => {
    dispatch(openForm({ isDeleting, id, type }));
  }, []);

  const onConfirmedForm = useCallback(
    (category: Category) => {
      dispatch(openFormSuccess(category));
    },
    [dispatch],
  );

  const onDismissForm = useCallback(() => {
    dispatch(openFormDismiss());
  }, [dispatch]);

  return useMemo(
    () => [
      { ...state },
      {
        onConfirmedForm,
        onDismissForm,
        onOpenForm,
        onSelected,
        onSelectedType,
      },
    ],
    [state],
  );
};
