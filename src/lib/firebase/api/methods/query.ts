import {
  collection,
  DocumentData,
  FirebaseFirestore,
  onSnapshot,
  query as fsQuery,
  QueryConstraint,
  QuerySnapshot,
} from 'firebase/firestore';

import { BaseModel } from '@app/api/common';

export default function query<TModel extends BaseModel>(
  db: FirebaseFirestore,
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
): Promise<TModel[]> {
  return new Promise((resolve, reject) => {
    onSnapshot(
      fsQuery(collection(db, collectionName), ...queryConstraints),
      (response: QuerySnapshot<DocumentData>) => {
        const data = response.docs.map(
          (document) => ({ id: document.id, ...document.data() } as TModel),
        );
        resolve(data);
      },
      (error) => {
        reject(error);
      },
    );
  });
}
