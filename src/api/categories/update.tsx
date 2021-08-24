import { useMemo } from 'react';

import { IFirestoreUpdate, useFirestoreUpdate } from '@lib/firebase';

import { Category } from './types';

export const useUpdateCategory = (): IFirestoreUpdate<Category> => {
  const { data, status, error, handleUpdate } = useFirestoreUpdate<Category>('categories');

  return useMemo(
    () => ({
      data,
      status,
      error,
      handleUpdate,
    }),
    [data, status, error],
  );
};
