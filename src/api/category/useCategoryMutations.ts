import { useMemo } from 'react';
import { UseMutationResult, useQueryClient } from 'react-query';

import { useApi } from '@api';
import { useToast } from '@lib/chakra-ui';
import { Category } from '@models';

import { useMutations } from '../mutations';
import { CATEGORIES_KEY, SUB_CATEGORIES_KEY } from './constants';

interface ICategoryMutation {
  create: UseMutationResult<Category, Error, Category>;
  remove: UseMutationResult<Category, Error, string>;
  update: UseMutationResult<Category, Error, Category>;
}

export const useCategoryMutations = (): ICategoryMutation => {
  const { categories } = useApi();
  const mutations = useMutations<Category>(categories);
  const toast = useToast();
  const queryClient = useQueryClient();

  const create = mutations.create({
    onSuccess: () => {
      toast.success({ title: 'Exito!', description: 'Se ha creado la categoria correctamente.' });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const remove = mutations.remove({
    onSuccess: () => {
      toast.success({
        title: 'Exito!',
        description: 'Se ha eliminado la categoria correctamente.',
      });
    },
    onError: (error: Error) => {
      toast.error({ title: 'Error!', description: error.message });
    },
  });

  const update = mutations.update({
    onSuccess: (data) => {
      const BASE_KEY = data.parentId ? SUB_CATEGORIES_KEY : CATEGORIES_KEY;
      queryClient.invalidateQueries([BASE_KEY, data.id], { exact: true });
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
