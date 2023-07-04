'use client';

import React from 'react';

import { ButtonProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { SaveButton } from '@/m/shared/buttons';

import { SubcategoryMoveFormType } from '../models/subcategory-move';
import { useCategoryUpdate } from '../query';

type Props = ButtonProps & {
  onSuccess: () => void;
};

const MoveSubcategoryButton: React.FC<Props> = ({ onSuccess, ...buttonProps }) => {
  const { handleSubmit, formState } = useFormContext<SubcategoryMoveFormType>();
  const { isSubmitting: isFormSubmitting } = formState;
  const { isLoading: isAsyncSubmitting, mutateAsync: updateCategory } = useCategoryUpdate();

  const onSubmit = handleSubmit((category) => {
    const options = { onSuccess };
    return updateCategory(category, options);
  });

  return (
    <SaveButton
      {...buttonProps}
      isLoading={isFormSubmitting || isAsyncSubmitting}
      onClick={onSubmit}
    />
  );
};

export { MoveSubcategoryButton };
