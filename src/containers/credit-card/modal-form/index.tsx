import React, { useMemo } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

import { useCreditCardById, useCreditCardMutations } from '@api';
import { CreditCardForm } from '@components';
import { useUser } from '@lib/supabase';
import { ModalForm } from '@lib/wal-ui';
import { CreditCard } from '@models';
import { CreditCardType } from '@models/common';

const CreditCardModalForm: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss }) => {
  const { user } = useUser();
  const { data: creditCard, isLoading } = useCreditCardById(id);
  const { create, update } = useCreditCardMutations();
  const { isLoading: isSubmitting } = id ? update : create;
  const title = useMemo(() => (id ? 'Editar Tarjeta' : 'Nueva Tarjeta'), [id]);

  const defValue: Partial<CreditCard> = useMemo(
    () => ({ userId: user?.id as string, type: CreditCardType.visa }),
    [user?.id],
  );

  /// HANDLERS
  const onConfirm: SubmitHandler<CreditCard> = (model) => {
    if (isSubmitting) return;

    if (!id) {
      return create.mutateAsync(model, {
        onSuccess: onConfirmed,
      });
    }
    return update.mutateAsync(model, {
      onSuccess: onConfirmed,
    });
  };

  const renderForm = (props: UseFormReturn<CreditCard>) => {
    return <CreditCardForm {...props} cc={creditCard} />;
  };

  return (
    <ModalForm
      actionButtonIcon="save"
      actionButtonText="Guardar"
      defaultValue={defValue}
      isLoading={isLoading}
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      model={creditCard}
      onClose={onDismiss}
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
  onConfirmed(cc: CreditCard): void;
  onDismiss(): void;
}

export { CreditCardModalForm };
