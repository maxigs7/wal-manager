import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useSupabaseApi } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Category } from '@models';

const useRemove = (showToast = true): UseMutationResult<Category, ApiError, string> => {
  const { categories } = useSupabaseApi();
  const toast = useToast();

  return useMutation<Category, ApiError, string>(categories.remove, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.category.toast.removeSuccess,
        });
    },
    onError: (error) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useRemove;
