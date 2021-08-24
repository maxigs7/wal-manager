import { useMemo, useReducer } from 'react';

import { updateDoc, getFirestore, doc } from 'firebase/firestore';

import { BaseModel } from '@app/api/common';

import { createReducer } from './reducer';
import { FirestoreStatus, IFirestoreState } from './types';

function useFirestoreUpdate<TModel extends BaseModel>(
  collectionName: string,
): IFirestoreUpdate<TModel> {
  const initialState: IFirestoreState<TModel> = {
    status: FirestoreStatus.IDLE,
    data: undefined,
    error: undefined,
  };

  // Setup our state and actions
  const reducer = useMemo(() => createReducer<TModel>(), []);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleUpdate = async (model: TModel): Promise<void> => {
    // Add a new document with a generated id.
    try {
      // TODO: MOVE TO CONTEXT
      const db = getFirestore();
      dispatch({ type: FirestoreStatus.LOADING });
      await updateDoc(doc(db, collectionName, model.id), model);
      dispatch({ type: FirestoreStatus.SUCCESS });
    } catch (error) {
      dispatch({ type: FirestoreStatus.ERROR, payload: { error: error } });
    }
  };

  return useMemo(
    () =>
      ({
        ...state,
        handleUpdate,
      } as IFirestoreUpdate<TModel>),
    [state],
  );
}

export interface IFirestoreUpdate<TModel> extends IFirestoreState<TModel> {
  handleUpdate<TModel>(model: TModel): Promise<void>;
}

export { useFirestoreUpdate };
