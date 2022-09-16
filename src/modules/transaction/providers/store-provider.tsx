import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { IDolarsi } from '@api';
import { getRangeFromDate } from '@lib';
import { Account, TransactionType } from '@models';

import {
  changeAccount,
  changeMonthYear,
  changeQuotation,
  filterByCategory,
  filterByCreditCard,
  highlightType,
  nextMonth,
  previousMonth,
} from '../store/actions';
import { reducer } from '../store/reducer';
import { IDispatch, initialState, Store } from '../store/state';

export const StoreContext: React.Context<Store> = createContext<Store>({} as Store);

export const useStore = () => useContext(StoreContext);

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChangedAccount = useCallback(
    (account: Account) => {
      dispatch(changeAccount(account));
    },
    [dispatch],
  );

  const onChangedMonthYear = useCallback(
    (month: number, year: number) => {
      dispatch(changeMonthYear({ month, year }));
    },
    [dispatch],
  );

  const onChangedQuotation = useCallback(
    (quotation?: IDolarsi) => {
      dispatch(changeQuotation(quotation));
    },
    [dispatch],
  );

  const onFilterByCategory = useCallback(
    (id: string) => {
      dispatch(filterByCategory(id));
    },
    [dispatch],
  );

  const onFilterByCreditCard = useCallback(
    (id: string) => {
      dispatch(filterByCreditCard(id));
    },
    [dispatch],
  );

  const onHighlightType = useCallback(
    (type?: TransactionType) => {
      dispatch(highlightType(type));
    },
    [dispatch],
  );

  const onNextMonth = useCallback(() => {
    dispatch(nextMonth());
  }, [dispatch]);

  const onPreviousMonth = useCallback(() => {
    dispatch(previousMonth());
  }, [dispatch]);

  const storeDispatch: IDispatch = useMemo(
    () => ({
      onChangedAccount,
      onChangedMonthYear,
      onChangedQuotation,
      onFilterByCategory,
      onFilterByCreditCard,
      onHighlightType,
      onNextMonth,
      onPreviousMonth,
    }),
    [
      onChangedAccount,
      onChangedMonthYear,
      onChangedQuotation,
      onFilterByCategory,
      onFilterByCreditCard,
      onHighlightType,
      onNextMonth,
      onPreviousMonth,
    ],
  );

  const { endDate, startDate } = useMemo(
    () => getRangeFromDate(new Date(state.year, state.month, 1, 0, 0, 0)),
    [state.month, state.year],
  );

  const extendedState = useMemo(
    () => ({ ...state, endDate, startDate }),
    [endDate, startDate, state],
  );

  return (
    <StoreContext.Provider value={[extendedState, storeDispatch]}>{children}</StoreContext.Provider>
  );
};

export const withStore = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithTransactionStore = (props: T) => (
    <StoreProvider>
      <WrappedComponent {...(props as T)} />
    </StoreProvider>
  );

  ComponentWithTransactionStore.displayName = `withTransactionStore(${displayName})`;

  return ComponentWithTransactionStore;
};
