import { updateDoc, doc, FirebaseFirestore } from 'firebase/firestore';

import { BaseModel } from '@app/api/common';

export default function put<TModel extends BaseModel>(
  db: FirebaseFirestore,
  collectionName: string,
  id: string,
  model: Partial<TModel>,
): Promise<void> {
  return updateDoc(doc(db, collectionName, id), model);
}
