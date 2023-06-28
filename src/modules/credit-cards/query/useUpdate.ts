'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { es } from '@/i18n';
import { useToast } from '@/lib/chakra-ui';
import { SupabaseError } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { CreditCard, CreditCardUpdate } from '@/models';
import { update } from '@/supabase';

type UseCreditCardUpdate = (
  shouldShowToast?: boolean,
) => UseMutationResult<CreditCard, SupabaseError, CreditCardUpdate>;

const useUpdate: UseCreditCardUpdate = (
  shouldShowToast = true,
): UseMutationResult<CreditCard, SupabaseError, CreditCardUpdate> => {
  const { supabase } = useSupabase();
  const toast = useToast();

  const onSuccess = () => {
    shouldShowToast &&
      toast.success({
        title: es.common.toast.success,
        description: es.creditCard.toast.updateSuccess,
      });
  };

  const onError = (error: SupabaseError) => {
    shouldShowToast && toast.error({ title: es.common.toast.error, description: error.message });
  };

  return useMutation<CreditCard, SupabaseError, CreditCardUpdate>(
    update<'creditCard'>(supabase, 'creditCard'),
    {
      onSuccess,
      onError,
    },
  );
};

export default useUpdate;
