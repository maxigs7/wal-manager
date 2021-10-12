import {
  collection,
  DocumentData,
  getFirestore,
  onSnapshot,
  query,
  QueryConstraint,
  QuerySnapshot,
  where,
} from 'firebase/firestore';

import { CATEGORY_COLLECTION } from '../constants';

export const isUnique = (name: string, userId: string, id?: string): Promise<string | boolean> => {
  const conditions = [
    where('userId', '==', userId),
    where('name', '==', name),
    id ? where('id', '!=', id) : null,
  ];

  return new Promise<string | boolean>((resolve, reject) => {
    const unsubscribe = onSnapshot(
      query(
        collection(getFirestore(), CATEGORY_COLLECTION),
        ...(conditions.filter((condition) => !!condition) as QueryConstraint[]),
      ),

      (collection: QuerySnapshot<DocumentData>) => {
        const message = collection.size > 0 ? 'Ya existe una categoria con ese nombre' : true;
        resolve(message);
      },
      (error) => {
        reject(error);
      },
      () => {
        unsubscribe();
      },
    );
  });
};
