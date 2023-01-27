import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { IDolarsi } from '@api';
import { CategoryLookup } from '@m/category';
import { Account, CreditCard, MovementType } from '@models';

import {
  changeAccount,
  changeMonthYear,
  changeQuotation,
  filterByCategory,
  filterByCreditCard,
  highlightType,
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
    (category?: CategoryLookup) => {
      dispatch(filterByCategory(category?.id));
    },
    [dispatch],
  );

  const onFilterByCreditCard = useCallback(
    (creditCard?: CreditCard) => {
      dispatch(filterByCreditCard(creditCard?.id));
    },
    [dispatch],
  );

  const onHighlightType = useCallback(
    (type?: MovementType) => {
      dispatch(highlightType(type));
    },
    [dispatch],
  );

  const storeDispatch: IDispatch = useMemo(
    () => ({
      onChangedAccount,
      onChangedMonthYear,
      onChangedQuotation,
      onFilterByCategory,
      onFilterByCreditCard,
      onHighlightType,
    }),
    [
      onChangedAccount,
      onChangedMonthYear,
      onChangedQuotation,
      onFilterByCategory,
      onFilterByCreditCard,
      onHighlightType,
    ],
  );

  return <StoreContext.Provider value={[state, storeDispatch]}>{children}</StoreContext.Provider>;
};

export const withStore = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithMovementStore = (props: T) => (
    <StoreProvider>
      <WrappedComponent {...(props as T)} />
    </StoreProvider>
  );

  ComponentWithMovementStore.displayName = `withMovementStore(${displayName})`;

  return ComponentWithMovementStore;
};
