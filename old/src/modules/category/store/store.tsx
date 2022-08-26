import { useCallback, useMemo, useReducer } from 'react';

import { Category } from '@models';

import { selected } from './actions';
import { reducer } from './reducer';
import { IDispatch, initialState, IState } from './state';

const hook = (): [IState, IDispatch] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSelected = useCallback(
    (category: Category) => {
      dispatch(selected(category));
    },
    [dispatch],
  );

  return useMemo(
    () => [
      state,
      {
        onSelected,
      },
    ],
    [state],
  );
};

export default hook;
