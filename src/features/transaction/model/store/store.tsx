import { useCallback, useMemo, useReducer } from 'react';

import { changeMonth, changeYear } from './actions';
import { reducer } from './reducer';
import { IDispatch, initialState, IState } from './state';

export const useStore = (): [IState, IDispatch] => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  return useMemo(
    () => [
      state,
      {
        onChangedMonth,
        onChangedYear,
      },
    ],
    [state],
  );
};
