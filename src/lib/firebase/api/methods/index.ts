import { DocumentReference, DocumentData, QueryConstraint, getFirestore } from 'firebase/firestore';

import { BaseModel } from '@app/api/common';

import get from './get';
import post from './post';
import put from './put';
import query from './query';
import remove from './remove';

export interface IFirestoreApi {
  get<TModel extends BaseModel>(collectionName: string, id: string): Promise<TModel>;
  post<TModel extends BaseModel>(
    collectionName: string,
    model: TModel,
  ): Promise<DocumentReference<DocumentData>>;
  put<TModel extends BaseModel>(
    collectionName: string,
    id: string,
    model: Partial<TModel>,
  ): Promise<void>;
  query<TModel extends BaseModel>(
    collectionName: string,
    ...queryConstraints: QueryConstraint[]
  ): Promise<TModel[]>;
  remove(collectionName: string, id: string): Promise<void>;
}

export const createApi = (): IFirestoreApi => {
  const db = getFirestore();

  return {
    get: (collectionName: string, id: string) => get(db, collectionName, id),
    post: <TModel extends BaseModel>(collectionName: string, model: TModel) =>
      post(db, collectionName, model),
    put: <TModel extends BaseModel>(collectionName: string, id: string, model: Partial<TModel>) =>
      put(db, collectionName, id, model),
    query: (collectionName: string, ...queryConstraints: QueryConstraint[]) =>
      query(db, collectionName, ...queryConstraints),
    remove: (collectionName: string, id: string) => remove(db, collectionName, id),
  };
};
