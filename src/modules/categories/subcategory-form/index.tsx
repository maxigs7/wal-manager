'use client';

import { Box, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { es } from '@/i18n';
import { InputControl } from '@/m/shared/controls/input';

import { SubcategoryFormType } from '../models/subcategory';

const SubcategoryForm: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<SubcategoryFormType>();

  return (
    <FormControl as={Box} isInvalid={!!errors.name} isRequired>
      <FormLabel htmlFor="name">{es.category.form.name}</FormLabel>
      <InputControl
        control={control}
        id="name"
        name="name"
        placeholder={es.category.form.namePlaceholder}
      />
      <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
    </FormControl>
  );
};

export { SubcategoryForm };
