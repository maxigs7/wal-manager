import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { es } from '@/i18n';
import { useToast } from '@/lib/chakra-ui';
import { SupabaseError } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { CreditCard } from '@/models';
import { removeById } from '@/supabase';

type UseCreditCardDelete = (
  shouldShowToast?: boolean,
) => UseMutationResult<CreditCard, SupabaseError, string>;

const useDelete: UseCreditCardDelete = (
  shouldShowToast = true,
): UseMutationResult<CreditCard, SupabaseError, string> => {
  const { supabase } = useSupabase();
  const toast = useToast();

  const onSuccess = () => {
    shouldShowToast &&
      toast.success({
        title: es.common.toast.success,
        description: es.creditCard.toast.removeSuccess,
      });
  };

  const onError = (error: SupabaseError) => {
    shouldShowToast && toast.error({ title: es.common.toast.error, description: error.message });
  };

  return useMutation<CreditCard, SupabaseError, string>(
    removeById<'creditCard'>(supabase, 'creditCard'),
    {
      onSuccess,
      onError,
    },
  );
};

export default useDelete;
