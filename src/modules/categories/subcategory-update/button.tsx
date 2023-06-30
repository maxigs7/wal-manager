'use client';
import React from 'react';

import { ButtonProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { SaveButton } from '@/m/shared/buttons';

import { SubcategoryFormType } from '../models/subcategory';
import { useCategoryUpdate } from '../query';

type Props = ButtonProps & {
  onSuccess: () => void;
};

const UpdateSubcategoryButton: React.FC<Props> = ({ onSuccess, ...buttonProps }) => {
  const { handleSubmit, formState } = useFormContext<SubcategoryFormType>();
  const { isSubmitting: isFormSubmitting } = formState;
  const { isLoading: isAsyncSubmitting, mutateAsync: updateSubcategory } = useCategoryUpdate();

  const onSubmit = handleSubmit((subcategory) => {
    const options = { onSuccess };
    return updateSubcategory(subcategory, options);
  });

  return (
    <SaveButton
      {...buttonProps}
      isLoading={isFormSubmitting || isAsyncSubmitting}
      onClick={onSubmit}
    />
  );
};

export { UpdateSubcategoryButton };
