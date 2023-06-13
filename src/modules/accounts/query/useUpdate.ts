'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { es } from '@/i18n';
import { useToast } from '@/lib/chakra-ui';
import { SupabaseError } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { Account, AccountUpdate } from '@/models';
import { update } from '@/supabase';

type UseAccountUpdate = (
  shouldShowToast?: boolean,
) => UseMutationResult<Account, SupabaseError, AccountUpdate>;

const useUpdate: UseAccountUpdate = (
  shouldShowToast = true,
): UseMutationResult<Account, SupabaseError, AccountUpdate> => {
  const { supabase } = useSupabase();
  const toast = useToast();

  const onSuccess = () => {
    shouldShowToast &&
      toast.success({
        title: es.common.toast.success,
        description: es.account.toast.updateSuccess,
      });
  };

  const onError = (error: SupabaseError) => {
    shouldShowToast && toast.error({ title: es.common.toast.error, description: error.message });
  };

  return useMutation<Account, SupabaseError, AccountUpdate>(
    update<'account'>(supabase, 'account'),
    {
      onSuccess,
      onError,
    },
  );
};

export default useUpdate;
