import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

import { getRangeFromDate } from '@lib';

import { changeMonth, changeYear } from '../store/actions';
import { reducer } from '../store/reducer';
import { initialState, Store } from '../store/state';

export const StoreContext: React.Context<Store> = createContext<Store>({} as Store);

export const useStore = () => useContext(StoreContext);

export const StoreProvider: React.FC = ({ children }) => {
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

  const storeDispatch = useMemo(
    () => ({
      onChangedMonth,
      onChangedYear,
    }),
    [],
  );

  const { endDate, startDate } = useMemo(
    () => getRangeFromDate(new Date(state.year, state.month, 1, 0, 0, 0)),
    [state.month, state.year],
  );

  const extendedState = useMemo(
    () => ({ ...state, endDate, startDate }),
    [endDate, startDate, state.month, state.year],
  );

  return (
    <StoreContext.Provider value={[extendedState, storeDispatch]}>{children}</StoreContext.Provider>
  );
};
