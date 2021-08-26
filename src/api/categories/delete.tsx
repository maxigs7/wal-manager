import { useMemo } from 'react';

import { IFirestoreDelete, useFirestoreDelete } from '@lib/firebase';

export const useDeleteCategory = (): IFirestoreDelete => {
  const { data, error, handleDelete, isLoading, status } = useFirestoreDelete('categories');

  return useMemo(
    () => ({
      data,
      error,
      handleDelete,
      isLoading,
      status,
    }),
    [data, error, handleDelete, isLoading, status],
  );
};
