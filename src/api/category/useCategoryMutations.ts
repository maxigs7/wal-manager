import { useMemo } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { useApi } from '@api';
import { useToast } from '@lib/chakra-ui';
import { Category, CategoryType } from '@models';

interface ICategoryMutation {
  create: UseMutationResult<Category, Error, Category>;
  remove: UseMutationResult<Category, Error, string>;
  update: UseMutationResult<Category, Error, Category>;
}

export const useCategoryMutations = (): ICategoryMutation => {
  const { categories } = useApi();
  const queryClient = useQueryClient();
  const toast = useToast();

  const refetchList = (type: CategoryType) => {
    queryClient.invalidateQueries(['categories', type], { exact: true, refetchInactive: true });
  };

  const create = useMutation<Category, Error, Category>(categories.create, {
    onSuccess: (category) => {
      refetchList(category.type);
      toast.success({ title: 'Exito!', description: 'Se ha creado la categoria correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const remove = useMutation<Category, Error, string>(categories.remove, {
    onSuccess: (category) => {
      refetchList(category.type);
      toast.success({
        title: 'Exito!',
        description: 'Se ha eliminado la categoria correctamente.',
      });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const update = useMutation<Category, Error, Category>(categories.update, {
    onSuccess: (category) => {
      refetchList(category.type);
      toast.success({
        title: 'Exito!',
        description: 'Se ha actualizado la categoria correctamente.',
      });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  return useMemo(
    () => ({
      create,
      update,
      remove,
    }),
    [create, update, remove],
  );
};
