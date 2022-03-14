import { useMutation, UseMutationResult } from 'react-query';

import { ApiError, useApi } from '@api';
import { useToast } from '@lib';
import { Category } from '@models';

const hook = (showToast = true): UseMutationResult<Category, ApiError, string> => {
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

export default hook;
