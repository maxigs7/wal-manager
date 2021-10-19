import React, { useEffect } from 'react';

import { DeleteDialog } from '@lib/wal-ui';

import { useRedux } from './useRedux';

const CreditCardDeleteDialog: React.FC<IProps> = ({ id, isOpen, onClose }) => {
  const { state, dispatch } = useRedux();

  const onConfirm = async () => {
    id && dispatch.onCreditCardRemove(id);
  };

  useEffect(() => {
    if (state.status === 'success') {
      onClose();
      dispatch.onFormReset();
      dispatch.onCreditCardsRefresh();
    }
  }, [state.status]);

  return (
    <DeleteDialog
      isLoading={state.isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Eliminar Tarjeta"
    />
  );
};

interface IProps {
  id?: string;
  isOpen: boolean;
  onClose(success?: boolean): void;
}

export { CreditCardDeleteDialog };
