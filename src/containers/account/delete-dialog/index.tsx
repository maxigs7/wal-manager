import React, { useEffect } from 'react';

import { DeleteDialog } from '@lib/wal-ui';

import { useRedux } from './useRedux';

const AccountDeleteDialog: React.FC<IProps> = ({ id, isOpen, onClose }) => {
  const { state, dispatch } = useRedux();

  const onConfirm = async () => {
    id && dispatch.onAccountRemove(id);
  };

  useEffect(() => {
    if (state.status === 'success') {
      onClose();
      dispatch.onFormReset();
      dispatch.onAccountsRefresh();
    }
  }, [state.status]);

  return (
    <DeleteDialog
      isLoading={state.isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Eliminar Cuenta"
    />
  );
};

interface IProps {
  id?: string;
  isOpen: boolean;
  onClose(success?: boolean): void;
}

export { AccountDeleteDialog };
