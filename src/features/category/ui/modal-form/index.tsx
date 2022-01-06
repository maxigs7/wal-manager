import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import {
  Category,
  CategoryRootForm,
  CategoryType,
  useCategoryCreate,
  useCategoryGetById,
  useCategoryUpdate,
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
  onConfirmed(category: Category): void;
  onDismiss(): void;
  type: CategoryType;
}

const ModalForm: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss, type }) => {
  const { user } = useUser();
  const create = useCategoryCreate();
  const update = useCategoryUpdate();
  const { data: category, isLoading } = useCategoryGetById(id);
  const { isLoading: isSubmitting, mutateAsync } = id ? update : create;

  const useFormProps = useForm<Category>({
    defaultValues: { userId: user?.id as string, type },
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

  const title = useMemo(() => (id ? 'Editar categoria' : 'Nueva categoria'), [id]);

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category]);

  return (
    <ModalFormContainer isOpen={isOpen} onClose={onDismiss} onSubmit={onSubmit} size="3xl">
      <ModalFormHeader onClose={onDismiss}>{title}</ModalFormHeader>
      <ModalFormBody isLoading={isLoading}>
        <CategoryRootForm {...useFormProps} id={id} type={type} />
      </ModalFormBody>
      <ModalFormFooter>
        <SubmitButton isSubmitting={isFormSubmitting || isSubmitting}>Guardar</SubmitButton>
        <CancelButton onClick={onDismiss} />
      </ModalFormFooter>
    </ModalFormContainer>
  );
};

export default ModalForm;
