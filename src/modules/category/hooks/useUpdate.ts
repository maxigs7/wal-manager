import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useUow } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Category, CategoryUpdate } from '@models';

const useCategoryUpdate = (
  showToast = true,
): UseMutationResult<Category, ApiError, CategoryUpdate> => {
  const { category } = useUow();
  const toast = useToast();

  return useMutation<Category, ApiError, Partial<CategoryUpdate>>(category.update, {
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

export default useCategoryUpdate;
