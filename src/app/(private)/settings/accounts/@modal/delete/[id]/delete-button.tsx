'use client';

import { useEffect } from 'react';

import { es } from '@/i18n';
import { ConfirmButton } from '@/layout/modal-remove';
import { useModalLayout } from '@/layout/modal-remove/provider';
import { useAccountDelete, useAccountSelectAllRefresh } from '@/m/accounts/hooks';

type Props = {
  id: string;
};

const DeleteButton: React.FC<Props> = ({ id }) => {
  const { onClose } = useModalLayout();
  const { data, isLoading, isSuccess, mutate, reset } = useAccountDelete();
  const refresh = useAccountSelectAllRefresh();

  const onConfirm = () => {
    id && mutate(id);
  };

  useEffect(() => {
    if (isSuccess && data) {
      reset();
      refresh(data.id);
      onClose();
    }
  }, [data, isSuccess, onClose, refresh, reset]);

  return (
    <ConfirmButton isLoading={isLoading} onConfirm={onConfirm}>
      {es.common.remove}
    </ConfirmButton>
  );
};

export { DeleteButton };
