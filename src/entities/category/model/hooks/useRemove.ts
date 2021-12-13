import { useMutation, UseMutationResult } from 'react-query';

import { Category, useApi } from '@entities';
import { ApiError, useToast } from '@shared';

export default (showToast = true): UseMutationResult<Category, ApiError, string> => {
  const { categories } = useApi();
  const toast = useToast();

  return useMutation<Category, ApiError, string>(categories.remove, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: 'Exito!',
          description: 'Se ha eliminado la categoria correctamente.',
        });
    },
    onError: (error) => {
      showToast && toast.error({ title: 'Error!', description: error.message });
    },
  });
};
