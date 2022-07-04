import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import { CategoryType } from '@models';
import { ITextFilterDispatch, ITextFilterState, useTextFilter } from '@shared';

import { changeType, IDispatch, initialState, IState, reducer } from './filter-store';

type ExtendedState = ITextFilterState & IState;
type ExtendedDispatch = ITextFilterDispatch & IDispatch;

export const CategoryFilterContext: React.Context<[ExtendedState, ExtendedDispatch]> =
  createContext<[ExtendedState, ExtendedDispatch]>([{}, {}] as [ExtendedState, ExtendedDispatch]);

export const useCategoryFilter = () => useContext(CategoryFilterContext);

export const CategoryFilterProvider: React.FC = ({ children }) => {
  const [textState, textDispatch] = useTextFilter();
  const { type } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState(type as CategoryType));

  const onChangedType = useCallback(
    (type: CategoryType) => {
      dispatch(changeType(type));
    },
    [dispatch],
  );

  const storeDispatch = useMemo(
    () => ({
      ...textDispatch,
      onChangedType,
    }),
    [textDispatch],
  );

  const extendedState = useMemo(
    () => ({
      ...textState,
      ...state,
    }),
    [textState, state],
  );

  return (
    <CategoryFilterContext.Provider value={[extendedState, storeDispatch]}>
      {children}
    </CategoryFilterContext.Provider>
  );
};
