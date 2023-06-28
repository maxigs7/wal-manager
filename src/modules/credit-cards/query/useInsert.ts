import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { es } from '@/i18n';
import { useToast } from '@/lib/chakra-ui';
import { SupabaseError } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { CreditCard, CreditCardInsert } from '@/models';
import { insert } from '@/supabase';

type UseCreditCardInsert = (
  shouldShowToast?: boolean,
) => UseMutationResult<CreditCard, SupabaseError, CreditCardInsert>;

const useInsert: UseCreditCardInsert = (
  shouldShowToast = true,
): UseMutationResult<CreditCard, SupabaseError, CreditCardInsert> => {
  const { supabase } = useSupabase();
  const toast = useToast();

  const onSuccess = () => {
    shouldShowToast &&
      toast.success({
        title: es.common.toast.success,
        description: es.creditCard.toast.createSuccess,
      });
  };

  const onError = (error: SupabaseError) => {
    shouldShowToast && toast.error({ title: es.common.toast.error, description: error.message });
  };

  return useMutation<CreditCard, SupabaseError, CreditCardInsert>(
    insert<'creditCard'>(supabase, 'creditCard'),
    {
      onSuccess,
      onError,
    },
  );
};

export default useInsert;
