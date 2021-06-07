import { useMemo } from 'react';

import { IconName } from '@fortawesome/fontawesome-svg-core';
import { collection, getFirestore, query, where } from 'firebase/firestore';

import { IFirestoreQueryState, useFirestoreQuery } from '@app/hooks/useFirestoreQuery';
import { useAuth } from '@lib/auth';

import { BaseModel, TransactionType } from '../common';

type CategoryBase = {
  isActive: boolean;
  name: string;
};

export type SubCategory = BaseModel & CategoryBase;

export type Category = BaseModel &
  CategoryBase & {
    transactionType: TransactionType;
    color: string;
    icon: IconName;
    subCategories?: SubCategory[];
    userId: string;
  };

export const useCategories = (): IFirestoreQueryState<Category[]> => {
  const { user } = useAuth();
  // Subscribe to Firestore document
  const { data, status, error } = useFirestoreQuery<Category[]>(
    user && query(collection(getFirestore(), 'categories'), where('userId', '==', user.uid)),
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
