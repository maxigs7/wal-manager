'use client';

import React from 'react';

import { ButtonProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { SaveButton } from '@/m/shared/buttons';

import { SubcategoryFormType } from '../models/subcategory';
import { useCategoryInsert } from '../query';

type Props = ButtonProps & {
  onSuccess: () => void;
};

const CreateSubcategoryButton: React.FC<Props> = ({ onSuccess, ...buttonProps }) => {
  const { handleSubmit, formState } = useFormContext<SubcategoryFormType>();
  const { isSubmitting: isFormSubmitting } = formState;
  const { isLoading: isAsyncSubmitting, mutateAsync: insertSubcategory } = useCategoryInsert();

  const onSubmit = handleSubmit((subcategory) => {
    const options = { onSuccess };
    return insertSubcategory(subcategory, options);
  });

  return (
    <SaveButton
      {...buttonProps}
      isLoading={isFormSubmitting || isAsyncSubmitting}
      onClick={onSubmit}
    />
  );
};

export { CreateSubcategoryButton };
