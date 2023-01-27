import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useUow } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Category, CategoryInsert } from '@models';

const useCategoryInsert = (
  showToast = true,
): UseMutationResult<Category, ApiError, CategoryInsert> => {
  const { category } = useUow();
  const toast = useToast();

  return useMutation<Category, ApiError, CategoryInsert>(category.insert, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.category.toast.createSuccess,
        });
    },
    onError: (error) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useCategoryInsert;
