import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useUow } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Category } from '@models';

const useCategoryDelete = (showToast = true): UseMutationResult<Category, ApiError, string> => {
  const { category } = useUow();
  const toast = useToast();

  return useMutation<Category, ApiError, string>(category.removeById, {
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

export default useCategoryDelete;
