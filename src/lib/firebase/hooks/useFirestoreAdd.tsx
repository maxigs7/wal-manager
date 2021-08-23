import { useMemo, useReducer } from 'react';

import { addDoc, collection, getFirestore } from 'firebase/firestore';

import { createReducer } from './reducer';
import { FirestoreStatus, IFirestoreState } from './types';

function useFirestoreAdd<TModel>(collectionName: string): IFirestoreAdd<TModel> {
  const initialState: IFirestoreState<TModel> = {
    status: FirestoreStatus.IDLE,
    data: undefined,
    error: undefined,
  };

  // Setup our state and actions
  const reducer = useMemo(() => createReducer<TModel>(), []);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAdd = async (model: TModel): Promise<void> => {
    // Add a new document with a generated id.
    try {
      // TODO: MOVE TO CONTEXT
      const db = getFirestore();
      dispatch({ type: FirestoreStatus.LOADING });
      const docRef = await addDoc(collection(db, collectionName), model);
      dispatch({ type: FirestoreStatus.SUCCESS, payload: { data: docRef.id } });
    } catch (error) {
      dispatch({ type: FirestoreStatus.ERROR, payload: { error: error } });
    }
  };

  return useMemo(
    () =>
      ({
        ...state,
        handleAdd,
      } as IFirestoreAdd<TModel>),
    [state],
  );
}

export interface IFirestoreAdd<TModel> extends IFirestoreState<TModel> {
  handleAdd<TModel>(model: TModel): Promise<void>;
}

export { useFirestoreAdd };
