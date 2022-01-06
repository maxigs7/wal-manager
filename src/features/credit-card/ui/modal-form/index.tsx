import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import {
  CreditCard,
  CreditCardForm,
  DEFAULT_CREDIT_CARD_TYPE,
  useCreditCardCreate,
  useCreditCardGetById,
  useCreditCardUpdate,
  useUser,
} from '@entities';
import {
  CancelButton,
  ModalFormBody,
  ModalFormContainer,
  ModalFormFooter,
  ModalFormHeader,
  SubmitButton,
} from '@shared';

interface IProps {
  id?: string;
  isOpen: boolean;
  onConfirmed(creditCard: CreditCard): void;
  onDismiss(): void;
}

const ModalForm: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss }) => {
  const { user } = useUser();
  const create = useCreditCardCreate();
  const update = useCreditCardUpdate();
  const { data: creditCard, isLoading } = useCreditCardGetById(id);
  const { isLoading: isSubmitting, mutateAsync } = id ? update : create;

  const useFormProps = useForm<CreditCard>({
    defaultValues: { userId: user?.id as string, type: DEFAULT_CREDIT_CARD_TYPE },
  });
  const {
    formState: { isSubmitting: isFormSubmitting },
    handleSubmit,
    reset,
  } = useFormProps;

  const onSubmit = handleSubmit((model) => {
    return mutateAsync(model, {
      onSuccess: onConfirmed,
    });
  });

  const title = useMemo(() => (id ? 'Editar tarjeta' : 'Nueva tarjeta'), [id]);

  useEffect(() => {
    if (creditCard) {
      reset(creditCard);
    }
  }, [creditCard]);

  return (
    <ModalFormContainer isOpen={isOpen} onClose={onDismiss} onSubmit={onSubmit} size="3xl">
      <ModalFormHeader onClose={onDismiss}>{title}</ModalFormHeader>
      <ModalFormBody isLoading={isLoading}>
        <CreditCardForm {...useFormProps} id={id} />
      </ModalFormBody>
      <ModalFormFooter>
        <SubmitButton icon="save" isSubmitting={isFormSubmitting || isSubmitting}>
          Guardar
        </SubmitButton>
        <CancelButton onClick={onDismiss} />
      </ModalFormFooter>
    </ModalFormContainer>
  );
};

export default ModalForm;
