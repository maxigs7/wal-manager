import React from 'react';
import { useForm } from 'react-hook-form';

import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';

import { Category, CategoryMoveForm, CategoryType } from '@models';
import {
  CancelButton,
  ModalFormBody,
  ModalFormContainer,
  ModalFormFooter,
  ModalFormHeader,
  SubmitButton,
} from '@shared';

import { useCategoryMove } from '../../hooks';
import SelectControl from '../select-control';

interface IProps {
  id?: string;
  isOpen: boolean;
  onConfirmed(category: Category): void;
  onDismiss(): void;
  parentId: string;
  type: CategoryType;
}

const ModalForm: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss, parentId, type }) => {
  const move = useCategoryMove();
  const { isLoading: isSubmitting, mutateAsync } = move;

  const useFormProps = useForm<CategoryMoveForm>({
    defaultValues: { id, parentId },
  });
  const {
    control,
    formState: { errors, isSubmitting: isFormSubmitting },
    handleSubmit,
  } = useFormProps;

  const onSubmit = handleSubmit((model) => {
    return mutateAsync(model, {
      onSuccess: onConfirmed,
    });
  });

  return (
    <ModalFormContainer isOpen={isOpen} onClose={onDismiss} onSubmit={onSubmit} size="3xl">
      <ModalFormHeader onClose={onDismiss}>Mover Categoria</ModalFormHeader>
      <ModalFormBody>
        <FormControl isInvalid={!!errors.parentId}>
          <FormLabel htmlFor="parentId">Nueva categoria padre</FormLabel>
          <SelectControl
            control={control}
            excludeId={[parentId]}
            id="parentId"
            name="parentId"
            placeholder="Seleccione Nueva Categoria Padre"
            rules={{
              required: 'Este campo es requerido.',
            }}
            type={type}
            excludeChildren
          />
          <FormErrorMessage>{errors.parentId && errors.parentId.message}</FormErrorMessage>
        </FormControl>
      </ModalFormBody>
      <ModalFormFooter>
        <SubmitButton isSubmitting={isFormSubmitting || isSubmitting}>Guardar</SubmitButton>
        <CancelButton onClick={onDismiss} />
      </ModalFormFooter>
    </ModalFormContainer>
  );
};

export default ModalForm;
