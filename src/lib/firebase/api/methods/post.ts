import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  FirebaseFirestore,
} from 'firebase/firestore';

export default function post<TModel>(
  db: FirebaseFirestore,
  collectionName: string,
  model: TModel,
): Promise<DocumentReference<DocumentData>> {
  return addDoc(collection(db, collectionName), model);
}
