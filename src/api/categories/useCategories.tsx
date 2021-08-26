import { useCallback, useMemo, useReducer } from 'react';

import { where } from '@firebase/firestore';

import { useAuth } from '@lib/auth';
import { useFirestoreApi } from '@lib/firebase';
import {
  createInitialState,
  createReducer,
  FirestoreStatus,
  IFirestoreState,
} from '@lib/firebase/store';

import { CategoryType } from '../common';
import { Category } from './types';

const COLLECTION_NAME = 'categories';

const useCategories = (): [IFirestoreState<Category[]>, IDispatch] => {
  const { query } = useFirestoreApi();
  const { userId } = useAuth();
  const initialState = useMemo(() => createInitialState<Category[]>(), []);
  const reducer = useMemo(() => createReducer<Category[]>(), []);
  const [state, dispatch] = useReducer(reducer, initialState);

  const requestList = useCallback((categoryType: CategoryType): void => {
    dispatch({ type: FirestoreStatus.LOADING });
    query<Category>(
      COLLECTION_NAME,
      where('userId', '==', userId),
      where('categoryType', '==', categoryType),
    ).then(
      (data: Category[]) => {
        dispatch({ type: FirestoreStatus.SUCCESS, payload: data });
      },
      (error) => {
        dispatch({ type: FirestoreStatus.ERROR, payload: error });
      },
    );
  }, []);

  return useMemo(
    () => [
      state,
      {
        requestList,
      },
    ],
    [state],
  );
};

interface IDispatch {
  requestList(categoryType: CategoryType): void;
}

export { useCategories };
