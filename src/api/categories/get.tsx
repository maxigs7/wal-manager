import { useMemo } from 'react';

import { getFirestore, doc } from 'firebase/firestore';

import { IFirestoreState, useFirestoreQuery } from '@lib/firebase';

import { Category } from './types';

export const useCategory = (id?: string): IFirestoreState<Category> => {
  const { data, status, error } = useFirestoreQuery<Category>(
    id && doc(getFirestore(), 'categories', id),
  );

  return useMemo(
    () => ({
      data: id ? data : undefined,
      status,
      error,
    }),
    [data, status, error],
  );
};
