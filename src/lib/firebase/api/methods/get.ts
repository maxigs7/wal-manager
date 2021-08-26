import { doc, DocumentSnapshot, FirebaseFirestore, onSnapshot } from 'firebase/firestore';

import { BaseModel } from '@app/api/common';

export default function get<TModel extends BaseModel>(
  db: FirebaseFirestore,
  collectionName: string,
  id: string,
): Promise<TModel> {
  return new Promise((resolve, reject) => {
    onSnapshot(
      doc(db, collectionName, id),
      (response: DocumentSnapshot) => {
        const data = response.exists() === true ? { id: response.id, ...response.data() } : null;
        resolve(data as TModel);
      },
      (error) => {
        reject(error);
      },
    );
  });
}
