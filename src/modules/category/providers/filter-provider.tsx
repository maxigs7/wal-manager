import { useRouter } from 'next/router';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { CategoryType } from '@models';

import { changeType, IDispatch, initialState, IState, reducer } from './filter-store';

export const CategoryFilterContext: React.Context<[IState, IDispatch]> = createContext<
  [IState, IDispatch]
>([{}, {}] as [IState, IDispatch]);

export const useCategoryFilter = () => useContext(CategoryFilterContext);

export const CategoryFilterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { query } = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState(query.type as CategoryType));

  const onChangedType = useCallback(
    (type: CategoryType) => {
      dispatch(changeType(type));
    },
    [dispatch],
  );

  const storeDispatch = useMemo(
    () => ({
      onChangedType,
    }),
    [onChangedType],
  );

  return (
    <CategoryFilterContext.Provider value={[state, storeDispatch]}>
      {children}
    </CategoryFilterContext.Provider>
  );
};
