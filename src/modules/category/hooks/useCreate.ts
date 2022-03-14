import { useMutation, UseMutationResult } from 'react-query';

import { ApiError, useApi } from '@api';
import { useToast } from '@lib';
import { Category } from '@models';

const hook = (showToast = true): UseMutationResult<Category, ApiError, Category> => {
  const { categories } = useApi();
  const toast = useToast();

  return useMutation<Category, ApiError, Category>(categories.create, {
    onSuccess: () => {
      showToast &&
        toast.success({ title: 'Exito!', description: 'Se ha creado la categoria correctamente.' });
    },
    onError: (error) => {
      showToast && toast.error({ title: 'Error!', description: error.message });
    },
  });
};

export default hook;
