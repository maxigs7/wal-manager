import { Box, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { es } from '@i18n';
import { Category, CategoryMoveForm, CategoryType } from '@models';

import { FormActions } from '../../components';
import { useCategoryMove } from '../../hooks';
import { CategorySelectControlContainer } from '../select-control';

interface IProps {
  id: string;
  onConfirmed(category: Category): void;
  parentId: string;
  type: CategoryType;
}

const SubCategoryMoveFormContainer: React.FC<IProps> = ({ id, onConfirmed, parentId, type }) => {
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
    <Box as="form" bg="white" onSubmit={onSubmit}>
      <FormActions
        display={['none', 'flex']}
        isLoading={isSubmitting || isFormSubmitting}
        type={type}
      />
      <Box maxW="md" p="5">
        <FormControl isInvalid={!!errors.parentId} isRequired>
          <FormLabel htmlFor="parentId">{es.category.form.parentId}</FormLabel>
          <CategorySelectControlContainer
            control={control}
            excludeId={[parentId]}
            id="parentId"
            name="parentId"
            placeholder={es.category.form.parentIdPlaceholder}
            type={type}
            rules={{
              required: es.common.validation.required,
            }}
            excludeChildren
          />
          <FormErrorMessage>{errors.parentId && errors.parentId.message}</FormErrorMessage>
        </FormControl>
      </Box>
      <FormActions
        display={['flex', 'none']}
        isLoading={isSubmitting || isFormSubmitting}
        type={type}
      />
    </Box>
  );
};

export { SubCategoryMoveFormContainer };
