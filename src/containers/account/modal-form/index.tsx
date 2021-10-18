import React, { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { AccountForm } from '@app/components';
import { Account } from '@app/models/accounts';
import { ModalForm } from '@lib/wal-ui';

import { useRedux } from './useRedux';

const AccountModalForm: React.FC<IProps> = ({ id, isOpen, onClose: onCloseModal }) => {
  const { state, dispatch } = useRedux();
  const title = useMemo(() => (id ? 'Editar categoria' : 'Nueva categoria'), [id]);

  const defValue: Partial<Account> = useMemo(
    () => ({ userId: state.userId as string }),
    [state.userId],
  );

  /// HANDLERS
  const onConfirm = (model: Account) => {
    if (state.isSubmitting) return;

    if (!id) {
      return dispatch.onAccountCreate(model);
    }
    return dispatch.onAccountUpdate(model);
  };

  const onClose = () => {
    dispatch.onFormReset();
    onCloseModal();
  };

  const renderForm = (props: UseFormReturn<Account>) => {
    return <AccountForm {...props} account={state.account} />;
  };

  /// EFFECTS
  useEffect(() => {
    if (id) {
      dispatch.onAccountRequest(id);
    }
  }, [id]);

  useEffect(() => {
    if (state.submissionStatus === 'success') {
      onCloseModal(state.idSaved);
      dispatch.onAccountsRefresh();
      dispatch.onFormReset();
    }
  }, [state.submissionStatus, state.idSaved]);

  return (
    <ModalForm
      actionButtonIcon="save"
      actionButtonText="Guardar"
      defaultValue={defValue}
      isLoading={state.isLoading}
      isOpen={isOpen}
      isSubmitting={state.isSubmitting}
      model={state.account}
      onClose={onClose}
      onConfirm={onConfirm}
      size="3xl"
      title={title}
    >
      {renderForm}
    </ModalForm>
  );
};

interface IProps {
  id?: string;
  isOpen: boolean;
  onClose(id?: string): void;
}

export { AccountModalForm };
