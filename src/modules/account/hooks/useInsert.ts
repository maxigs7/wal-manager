import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useUow } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Account, AccountInsert } from '@models';

const useAccountInsert = (
  showToast = true,
): UseMutationResult<Account, ApiError, AccountInsert> => {
  const { account } = useUow();
  const toast = useToast();

  return useMutation<Account, ApiError, AccountInsert>(account.insert, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.account.toast.createSuccess,
        });
    },
    onError: (error) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useAccountInsert;
