import {
  addDoc,
  doc,
  getDoc,
  DocumentSnapshot,
  Firestore,
  collection,
  query,
  QueryConstraint,
  QuerySnapshot,
  getDocs,
  DocumentReference,
  updateDoc,
  UpdateData,
} from '@firebase/firestore';
import { deleteDoc } from 'firebase/firestore';

import { converter } from '@lib/firebase';

import { Account } from './accounts';
import { Category } from './categories';
import { BaseModel } from './common';
import {
  ACCOUNT_COLLECTION,
  CATEGORY_COLLECTION,
  CREDIT_CARD_COLLECTION,
  TRANSACTION_COLLECTION,
} from './constants';
import { CreditCard } from './credit-cards';
import { Transaction } from './transactions';

const types = new Map([
  ['ACCOUNT', ACCOUNT_COLLECTION],
  ['CATEGORY', CATEGORY_COLLECTION],
  ['CREDIT_CARD', CREDIT_CARD_COLLECTION],
  ['TRANSACTION', TRANSACTION_COLLECTION],
]);

export interface IUow {
  accounts: IRepository<Account>;
  categories: IRepository<Category>;
  creditCards: IRepository<CreditCard>;
  transactions: IRepository<Transaction>;
}

const getCollectionName = (key: string): string => {
  if (types.has(key)) return types.get(key) as string;
  throw new Error('WRONG KEY');
};

const buildRepository = <T extends BaseModel>(db: Firestore, key: string): IRepository<T> => {
  const collectionName = getCollectionName(key);
  return {
    create: async (model: T): Promise<string> => {
      const collectionRef = collection(db, collectionName);
      const docRef: DocumentReference = await addDoc(collectionRef, model);
      return docRef.id;
    },
    getAll: async (...constraints: QueryConstraint[]): Promise<T[]> => {
      const collectionRef = collection(db, collectionName).withConverter(converter<T>());
      const qry = query<T>(collectionRef, ...(constraints || []));
      const snapshot: QuerySnapshot<T> = await getDocs(qry);
      const data = snapshot.docs.filter((doc) => doc.exists()).map((doc) => doc.data());
      return data || [];
    },
    getById: async (id: string): Promise<T | null> => {
      const docRef = doc(db, collectionName, id).withConverter(converter<T>());
      const snapshot: DocumentSnapshot<T> = await getDoc(docRef);
      if (!snapshot.exists()) {
        return null;
      }
      return snapshot.data();
    },
    remove: async (id: string): Promise<void> => {
      const docRef = doc(db, collectionName, id).withConverter(converter<T>());
      await deleteDoc(docRef);
    },
    update: async (id: string, model: UpdateData<T>): Promise<void> => {
      const docRef = doc(db, collectionName, id).withConverter(converter<T>());
      await updateDoc<T>(docRef, model);
    },
  };
};

interface IRepository<T extends BaseModel> {
  create(model: T): Promise<string>;
  getAll(...constraints: QueryConstraint[]): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  remove(id: string): Promise<void>;
  update(id: string, model: UpdateData<T>): Promise<void>;
}

export const getUow = (db: Firestore): IUow => ({
  accounts: {
    ...buildRepository<Account>(db, 'ACCOUNT'),
  },
  categories: {
    ...buildRepository<Category>(db, 'CATEGORY'),
  },
  creditCards: {
    ...buildRepository<CreditCard>(db, 'CREDIT_CARD'),
  },
  transactions: {
    ...buildRepository<Transaction>(db, 'TRANSACTION'),
  },
});
