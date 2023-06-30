'use client';

import React from 'react';

import { ButtonProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { SaveButton } from '@/m/shared/buttons';

import { CategoryFormType } from '../models/category';
import { useCategoryInsert } from '../query';

type Props = ButtonProps & {
  onSuccess: () => void;
};

const CreateCategoryButton: React.FC<Props> = ({ onSuccess, ...buttonProps }) => {
  const { handleSubmit, formState } = useFormContext<CategoryFormType>();
  const { isSubmitting: isFormSubmitting } = formState;
  const { isLoading: isAsyncSubmitting, mutateAsync: insertCategory } = useCategoryInsert();

  const onSubmit = handleSubmit((category) => {
    const options = { onSuccess };
    return insertCategory(category, options);
  });

  return (
    <SaveButton
      {...buttonProps}
      isLoading={isFormSubmitting || isAsyncSubmitting}
      onClick={onSubmit}
    />
  );
};

export { CreateCategoryButton };
