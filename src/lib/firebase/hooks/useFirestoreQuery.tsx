import { useCallback, useEffect, useMemo, useReducer } from 'react';

import {
  DocumentData,
  DocumentSnapshot,
  onSnapshot,
  Query,
  queryEqual,
  QuerySnapshot,
  refEqual,
} from 'firebase/firestore';

import { useMemoCompare } from '@app/hooks';

import { createReducer } from './reducer';
import { FirestoreQuerySnapshot, FirestoreStatus, IFirestoreState } from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useFirestoreQuery<T>(query: any): IFirestoreState<T> {
  // Our initial state
  // Start with an "idle" status if query is falsy, as that means hook consumer is
  // waiting on required data before creating the query object.
  // Example: useFirestoreQuery(uid && firestore.collection("profiles").doc(uid))
  const initialState: IFirestoreState<T> = {
    status: query ? FirestoreStatus.LOADING : FirestoreStatus.IDLE,
    data: undefined,
    error: undefined,
  };

  // Setup our state and actions
  const reducer = useMemo(() => createReducer<T>(), []);
  const [state, dispatch] = useReducer(reducer, initialState);
  const isQuery = useCallback(() => query instanceof Query, [query]);
  const isCollection = useCallback((response) => response instanceof QuerySnapshot, []);

  // Get cached Firestore query object with useMemoCompare (https://usehooks.com/useMemoCompare)
  // Needed because firestore.collection("profiles").doc(uid) will always being a new object reference
  // causing effect to run -> state change -> rerender -> effect runs -> etc ...
  // This is nicer than requiring hook consumer to always memoize query with useMemo.
  const queryCached = useMemoCompare(query, (prevQuery: any): any => {
    // Use built-in Firestore isEqual method to determine if "equal"
    if (!prevQuery || !query) return false;
    if (isQuery()) return queryEqual(query, prevQuery);
    return refEqual(query, prevQuery);
  });

  // Get doc data and merge doc.id
  const getDocData = useCallback(
    (doc: DocumentSnapshot<DocumentData>) =>
      doc.exists() === true ? { id: doc.id, ...doc.data() } : null,
    [],
  );

  // Get array of doc data from collection
  const getCollectionData = useCallback(
    (collection: QuerySnapshot<DocumentData>) => collection.docs.map(getDocData),
    [],
  );

  useEffect(() => {
    // Return early if query is falsy and reset to "idle" status in case
    // we're coming from "success" or "error" status due to query change.
    if (!queryCached) {
      dispatch({ type: FirestoreStatus.IDLE });
      return;
    }
    dispatch({ type: FirestoreStatus.LOADING });
    // Subscribe to query with onSnapshot
    // Will unsubscribe on cleanup since this returns an unsubscribe function
    return onSnapshot(
      queryCached,
      (response: FirestoreQuerySnapshot) => {
        // Get data for collection or doc
        const data = isCollection(response)
          ? getCollectionData(response as QuerySnapshot)
          : getDocData(response as DocumentSnapshot);
        dispatch({ type: FirestoreStatus.SUCCESS, payload: data });
      },
      (error) => {
        dispatch({ type: FirestoreStatus.ERROR, payload: error });
      },
    );
  }, [queryCached]); // Only run effect if queryCached changes

  return state;
}
