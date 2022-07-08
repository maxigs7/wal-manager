import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@api';
import { ApiError, useToast } from '@lib';
import { Category, CategoryMoveForm } from '@models';

const hook = (showToast = true): UseMutationResult<Category, ApiError, CategoryMoveForm> => {
  const { categories } = useApi();
  const toast = useToast();

  return useMutation<Category, ApiError, CategoryMoveForm>(categories.update, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: 'Exito!',
          description: 'Se ha movido la categoria correctamente.',
        });
    },
    onError: (error: Error) => {
      showToast && toast.error({ title: 'Error!', description: error.message });
    },
  });
};

export default hook;
