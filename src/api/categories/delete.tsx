import { useMemo } from 'react';

import { IFirestoreDelete, useFirestoreDelete } from '@lib/firebase';

export const useDeleteCategory = (): IFirestoreDelete => {
  const { data, status, error, handleDelete } = useFirestoreDelete('categories');

  return useMemo(
    () => ({
      data,
      status,
      error,
      handleDelete,
    }),
    [data, status, error],
  );
};
