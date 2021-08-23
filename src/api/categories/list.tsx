import { useMemo } from 'react';

import { collection, getFirestore, query, where } from 'firebase/firestore';

import { useAuth } from '@lib/auth';
import { IFirestoreState, useFirestoreQuery } from '@lib/firebase';

import { CategoryType } from '../common';
import { Category } from './types';

export const useCategoriesByType = (categoryType: CategoryType): IFirestoreState<Category[]> => {
  const { userId } = useAuth();
  // Subscribe to Firestore document
  const { data, status, error } = useFirestoreQuery<Category[]>(
    userId &&
      query(
        collection(getFirestore(), 'categories'),
        where('userId', '==', userId),
        where('categoryType', '==', categoryType),
      ),
  );

  return useMemo(
    () => ({
      data,
      status,
      error,
    }),
    [data, status, error],
  );
};
