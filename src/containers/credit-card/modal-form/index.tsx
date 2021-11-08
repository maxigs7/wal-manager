import React, { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useCreditCardById, useCreditCardMutations } from '@api';
import { CreditCardForm } from '@components';
import { useUser } from '@lib/supabase';
import { ModalForm } from '@lib/wal-ui';
import { CreditCard } from '@models';
import { CreditCardType } from '@models/common';

const CreditCardModalForm: React.FC<IProps> = ({ id, isOpen, onClose: onCloseModal }) => {
  // const { state, dispatch } = useRedux();
  const { user } = useUser();
  const { data: creditCard, isLoading, refetch } = useCreditCardById(id);
  const { create, update } = useCreditCardMutations();
  const { isLoading: isSubmitting, isSuccess } = id ? update : create;
  const title = useMemo(() => (id ? 'Editar Tarjeta' : 'Nueva Tarjeta'), [id]);

  const defValue: Partial<CreditCard> = useMemo(
    () => ({ userId: user?.id as string, type: CreditCardType.visa }),
    [user?.id],
  );

  /// HANDLERS
  const onConfirm = (model: CreditCard) => {
    if (isSubmitting) return;

    if (!id) {
      return create.mutate(model);
    }
    return update.mutate(model);
  };

  const onClose = () => {
    // dispatch.onFormReset();
    onCloseModal();
  };

  const renderForm = (props: UseFormReturn<CreditCard>) => {
    return <CreditCardForm {...props} cc={creditCard} />;
  };

  /// EFFECTS
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      onCloseModal();
    }
  }, [isSuccess]);

  return (
    <ModalForm
      actionButtonIcon="save"
      actionButtonText="Guardar"
      defaultValue={defValue}
      isLoading={isLoading}
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      model={creditCard}
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
