import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@api';
import { ApiError, useToast } from '@lib';
import { Category } from '@models';

const hook = (showToast = true): UseMutationResult<Category, ApiError, Category> => {
  const { categories } = useApi();
  const toast = useToast();

  return useMutation<Category, ApiError, Category>(categories.update, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: 'Exito!',
          description: 'Se ha actualizado la categoria correctamente.',
        });
    },
    onError: (error: Error) => {
      showToast && toast.error({ title: 'Error!', description: error.message });
    },
  });
};

export default hook;
