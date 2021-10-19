import React, { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { CreditCardForm } from '@app/components';
import { CreditCard } from '@app/models/credit-cards';
import { ModalForm } from '@lib/wal-ui';

import { useRedux } from './useRedux';

const CreditCardModalForm: React.FC<IProps> = ({ id, isOpen, onClose: onCloseModal }) => {
  const { state, dispatch } = useRedux();
  const title = useMemo(() => (id ? 'Editar Tarjeta' : 'Nueva Tarjeta'), [id]);

  const defValue: Partial<CreditCard> = useMemo(
    () => ({ userId: state.userId as string }),
    [state.userId],
  );

  /// HANDLERS
  const onConfirm = (model: CreditCard) => {
    if (state.isSubmitting) return;

    if (!id) {
      return dispatch.onCreditCardCreate(model);
    }
    return dispatch.onCreditCardUpdate(model);
  };

  const onClose = () => {
    dispatch.onFormReset();
    onCloseModal();
  };

  const renderForm = (props: UseFormReturn<CreditCard>) => {
    return <CreditCardForm {...props} cc={state.creditCard} />;
  };

  /// EFFECTS
  useEffect(() => {
    if (id) {
      dispatch.onCreditCardRequest(id);
    }
  }, [id]);

  useEffect(() => {
    if (state.submissionStatus === 'success') {
      onCloseModal(state.idSaved);
      dispatch.onCreditCardsRefresh();
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
      model={state.creditCard}
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

export { CreditCardModalForm };
