import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

import { changeText, IDispatch, initialState, IState, reducer } from './filter-store';

export const AccountFilterContext: React.Context<[IState, IDispatch]> = createContext<
  [IState, IDispatch]
>([{}, {}] as [IState, IDispatch]);

export const useAccountFilter = () => useContext(AccountFilterContext);

export const AccountFilterProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChangedText = useCallback(
    (text: string) => {
      dispatch(changeText(text));
    },
    [dispatch],
  );

  const storeDispatch = useMemo(
    () => ({
      onChangedText,
    }),
    [],
  );

  return (
    <AccountFilterContext.Provider value={[state, storeDispatch]}>
      {children}
    </AccountFilterContext.Provider>
  );
};
