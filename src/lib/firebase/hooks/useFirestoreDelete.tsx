import { useMemo, useReducer } from 'react';

import { deleteDoc, getFirestore, doc } from 'firebase/firestore';

import { createInitialState, createReducer } from './reducer';
import { FirestoreStatus, IFirestoreState } from './types';

function useFirestoreDelete(collectionName: string): IFirestoreDelete {
  const initialState = useMemo(() => createInitialState<boolean>(), []);
  const reducer = useMemo(() => createReducer<boolean>(), []);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDelete = async (id: string): Promise<void> => {
    // Add a new document with a generated id.
    try {
      // TODO: MOVE TO CONTEXT
      const db = getFirestore();
      dispatch({ type: FirestoreStatus.LOADING });
      await deleteDoc(doc(db, collectionName, id));
      dispatch({ type: FirestoreStatus.SUCCESS, payload: { data: true } });
    } catch (error) {
      dispatch({ type: FirestoreStatus.ERROR, payload: { error: error } });
    }
  };

  return useMemo(
    () =>
      ({
        ...state,
        handleDelete,
      } as IFirestoreDelete),
    [state],
  );
}

export interface IFirestoreDelete extends IFirestoreState<boolean> {
  handleDelete(id: string): Promise<void>;
}

export { useFirestoreDelete };
