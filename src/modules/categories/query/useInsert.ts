import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { es } from '@/i18n';
import { useToast } from '@/lib/chakra-ui';
import { SupabaseError } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { Category, CategoryInsert } from '@/models';
import { insert } from '@/supabase';

type UseCategoryInsert = (
  shouldShowToast?: boolean,
) => UseMutationResult<Category, SupabaseError, CategoryInsert>;

const useInsert: UseCategoryInsert = (
  shouldShowToast = true,
): UseMutationResult<Category, SupabaseError, CategoryInsert> => {
  const { supabase } = useSupabase();
  const toast = useToast();

  const onSuccess = () => {
    shouldShowToast &&
      toast.success({
        title: es.common.toast.success,
        description: es.category.toast.createSuccess,
      });
  };

  const onError = (error: SupabaseError) => {
    shouldShowToast && toast.error({ title: es.common.toast.error, description: error.message });
  };

  return useMutation<Category, SupabaseError, CategoryInsert>(
    insert<'category'>(supabase, 'category'),
    {
      onSuccess,
      onError,
    },
  );
};

export default useInsert;
