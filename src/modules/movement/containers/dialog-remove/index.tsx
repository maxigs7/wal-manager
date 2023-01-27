import React, { useEffect } from 'react';


import { es } from '@/i18n';
import { DialogRemove } from '@/shared';

import {
  useMovementDelete,
  useMovementSelectAllRefresh,
  useMovementSelectSummaryRefresh,
} from '../../hooks';

interface IProps {
  id?: string;
  isOpen: boolean;
  onDismiss(): void;
}

const MovementDialogRemove: React.FC<IProps> = ({ id, isOpen, onDismiss }) => {
  const { data, isLoading, isSuccess, mutate, reset } = useMovementDelete();
  const refreshSelect = useMovementSelectAllRefresh();
  const refreshSummary = useMovementSelectSummaryRefresh();

  const onConfirm = () => {
    id && mutate(id);
  };

  useEffect(() => {
    if (isSuccess && data) {
      reset();
      refreshSelect(data.accountId, data.month, data.year, data.id);
      refreshSummary(data.accountId, data.month, data.year);
      onDismiss();
    }
  }, [data, isSuccess, onDismiss, refreshSelect, refreshSummary, reset]);

  return (
    <DialogRemove
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onDismiss}
      onConfirm={onConfirm}
      title={es.account.pages.remove.title}
    />
  );
};

export { MovementDialogRemove };
