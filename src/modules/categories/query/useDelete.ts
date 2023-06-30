import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { es } from '@/i18n';
import { useToast } from '@/lib/chakra-ui';
import { SupabaseError } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { Category } from '@/models';
import { removeById } from '@/supabase';

type UseCategoryDelete = (
  shouldShowToast?: boolean,
) => UseMutationResult<Category, SupabaseError, string>;

const useDelete: UseCategoryDelete = (
  shouldShowToast = true,
): UseMutationResult<Category, SupabaseError, string> => {
  const { supabase } = useSupabase();
  const toast = useToast();

  const onSuccess = () => {
    shouldShowToast &&
      toast.success({
        title: es.common.toast.success,
        description: es.category.toast.removeSuccess,
      });
  };

  const onError = (error: SupabaseError) => {
    shouldShowToast && toast.error({ title: es.common.toast.error, description: error.message });
  };

  return useMutation<Category, SupabaseError, string>(
    removeById<'category'>(supabase, 'category'),
    {
      onSuccess,
      onError,
    },
  );
};

export default useDelete;
