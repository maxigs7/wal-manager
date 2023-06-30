'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { es } from '@/i18n';
import { useToast } from '@/lib/chakra-ui';
import { SupabaseError } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { Category, CategoryUpdate } from '@/models';
import { update } from '@/supabase';

type UseCategoryUpdate = (
  shouldShowToast?: boolean,
) => UseMutationResult<Category, SupabaseError, CategoryUpdate>;

const useUpdate: UseCategoryUpdate = (
  shouldShowToast = true,
): UseMutationResult<Category, SupabaseError, CategoryUpdate> => {
  const { supabase } = useSupabase();
  const toast = useToast();

  const onSuccess = () => {
    shouldShowToast &&
      toast.success({
        title: es.common.toast.success,
        description: es.category.toast.updateSuccess,
      });
  };

  const onError = (error: SupabaseError) => {
    shouldShowToast && toast.error({ title: es.common.toast.error, description: error.message });
  };

  return useMutation<Category, SupabaseError, CategoryUpdate>(
    update<'category'>(supabase, 'category'),
    {
      onSuccess,
      onError,
    },
  );
};

export default useUpdate;
