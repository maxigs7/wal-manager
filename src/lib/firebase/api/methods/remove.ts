import { deleteDoc, doc, FirebaseFirestore } from 'firebase/firestore';

export default function remove(
  db: FirebaseFirestore,
  collectionName: string,
  id: string,
): Promise<void> {
  return deleteDoc(doc(db, collectionName, id));
}
