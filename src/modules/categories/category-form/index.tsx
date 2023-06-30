'use client';

import { FormControl, FormErrorMessage, FormLabel, GridItem, SimpleGrid } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { es } from '@/i18n';
import { ColorSelectControl } from '@/m/shared/controls/color-select';
import { IconSelectControl } from '@/m/shared/controls/icon-select';
import { InputControl } from '@/m/shared/controls/input';

import { CategoryFormType } from '../models/category';

const CategoryForm: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CategoryFormType>();

  return (
    <SimpleGrid columns={[1, 2]} gap={6}>
      <FormControl as={GridItem} colSpan={[1, 2]} isInvalid={!!errors.name} isRequired>
        <FormLabel htmlFor="name">{es.category.form.name}</FormLabel>
        <InputControl
          control={control}
          id="name"
          name="name"
          placeholder={es.category.form.namePlaceholder}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} colSpan={[2, 1]} isInvalid={!!errors.color} isRequired>
        <FormLabel htmlFor="color">{es.category.form.color}</FormLabel>
        <ColorSelectControl
          control={control}
          id="color"
          name="color"
          placeholder={es.category.form.color}
        />
        <FormErrorMessage>{errors.color && errors.color.message}</FormErrorMessage>
      </FormControl>
      <FormControl as={GridItem} colSpan={[2, 1]} isInvalid={!!errors.icon} isRequired>
        <FormLabel htmlFor="icon">{es.category.form.icon}</FormLabel>
        <IconSelectControl
          control={control}
          id="icon"
          name="icon"
          placeholder={es.category.form.icon}
        />
        <FormErrorMessage>{errors.icon && errors.icon.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

export { CategoryForm };
