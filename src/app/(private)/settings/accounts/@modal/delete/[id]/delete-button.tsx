'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { es } from '@/i18n';
import { ConfirmButton } from '@/layout/modal-remove';
import { useAccountDelete } from '@/m/accounts/query';
import { routes } from '@/routes';

type Props = {
  id: string;
};

const DeleteButton: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const { data, isLoading, isSuccess, mutate, reset } = useAccountDelete();

  const onDeleteConfirm = () => {
    id && mutate(id);
  };

  useEffect(() => {
    if (isSuccess && data) {
      reset();
      router.replace(routes.settings.account.index);
    }
  }, [data, router, reset, isSuccess]);

  return (
    <ConfirmButton isLoading={isLoading} onConfirm={onDeleteConfirm}>
      {es.common.remove}
    </ConfirmButton>
  );
};

export { DeleteButton };
