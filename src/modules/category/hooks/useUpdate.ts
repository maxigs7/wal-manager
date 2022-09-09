import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useSupabaseClient } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Category } from '@models';

const useUpdate = (showToast = true): UseMutationResult<Category, ApiError, Category> => {
  const { categories } = useSupabaseClient();
  const toast = useToast();

  return useMutation<Category, ApiError, Category>(categories.update, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.category.toast.updateSuccess,
        });
    },
    onError: (error: Error) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useUpdate;
