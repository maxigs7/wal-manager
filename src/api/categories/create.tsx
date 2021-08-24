import { useMemo } from 'react';

import { IFirestoreAdd, useFirestoreAdd } from '@lib/firebase';

import { Category } from './types';

export const useCreateCategory = (): IFirestoreAdd<Category> => {
  const { data, status, error, handleAdd } = useFirestoreAdd<Category>('categories');

  return useMemo(
    () => ({
      data,
      status,
      error,
      handleAdd,
    }),
    [data, status, error],
  );
};
