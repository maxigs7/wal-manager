import { useCallback, useMemo, useReducer } from 'react';

import { useToast } from '@lib/chakra-ui';
import {
  useFirestoreApi,
  createInitialState,
  createReducer,
  FirestoreStatus,
  IFirestoreState,
} from '@lib/firebase';

import { Category } from './types';

const COLLECTION_NAME = 'categories';

const useCategory = (): [IFirestoreState<Category>, IDispatch] => {
  const { get, post, put, remove } = useFirestoreApi();
  const { success, error } = useToast();
  const initialState = useMemo(() => createInitialState<Category>(), []);
  const reducer = useMemo(() => createReducer<Category>(), []);
  const [state, dispatch] = useReducer(reducer, initialState);

  const request = useCallback((id: string): void => {
    dispatch({ type: FirestoreStatus.LOADING });
    get<Category>(COLLECTION_NAME, id).then(
      (data: Category) => {
        dispatch({ type: FirestoreStatus.SUCCESS, payload: data });
      },
      (error) => {
        dispatch({ type: FirestoreStatus.ERROR, payload: error });
      },
    );
  }, []);

  const save = useCallback((model: Category, id?: string): Promise<void> => {
    let promise;
    dispatch({ type: FirestoreStatus.LOADING });
    if (id) {
      promise = put<Category>(COLLECTION_NAME, id, model);
    } else {
      promise = post<Category>(COLLECTION_NAME, model);
    }
    return promise.then(
      () => {
        dispatch({ type: FirestoreStatus.SUCCESS });
        success({
          description: id
            ? 'La categoria ha sido actualizada correctamente'
            : 'La categoria ha sido creada correctamente.',
          title: id ? 'Categoria actualizada.' : 'Categoria creada',
        });
      },
      (reason) => {
        dispatch({ type: FirestoreStatus.ERROR, payload: reason });
        error({
          title: 'Ha ocurrido un error',
        });
      },
    );
  }, []);

  const removeCategory = useCallback((id: string): Promise<void> => {
    dispatch({ type: FirestoreStatus.LOADING });

    return remove(COLLECTION_NAME, id).then(
      () => {
        dispatch({ type: FirestoreStatus.SUCCESS });
        success({
          description: 'La categoria ha sido eliminada correctamente.',
          title: 'Categoria Eliminada',
        });
      },
      (reason) => {
        dispatch({ type: FirestoreStatus.ERROR, payload: reason });
        error({
          title: 'Ha ocurrido un error',
        });
      },
    );
  }, []);

  return useMemo(
    () => [
      state,
      {
        request,
        save,
        remove: removeCategory,
      },
    ],
    [state],
  );
};

interface IDispatch {
  remove(id: string): Promise<void>;
  request(id: string): void;
  save(model: Category, id?: string): Promise<void>;
}

export { useCategory };
