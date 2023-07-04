'use client';

import { Box, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { es } from '@/i18n';

import { CategorySelectControl } from '../category-select-control';
import { SubcategoryMoveFormType } from '../models/subcategory-move';
import { useSubcategoryMoveForm } from './form-provider';

const SubcategoryMoveForm: React.FC = () => {
  const { categories } = useSubcategoryMoveForm();
  const {
    control,
    formState: { errors },
  } = useFormContext<SubcategoryMoveFormType>();

  return (
    <FormControl as={Box} isInvalid={!!errors.parentId} isRequired>
      <FormLabel htmlFor="parentId">{es.category.form.parentId}</FormLabel>
      <CategorySelectControl
        categories={categories}
        control={control}
        id="parentId"
        name="parentId"
        placeholder={es.category.form.parentIdPlaceholder}
      />
      <FormErrorMessage>{errors.parentId && errors.parentId.message}</FormErrorMessage>
    </FormControl>
  );
};

export { SubcategoryMoveForm };
