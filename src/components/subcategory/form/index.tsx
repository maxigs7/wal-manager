import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

import { Category, useIsUnique } from '@models/categories';

const Form: React.FC<IProps> = ({ category, formState: { errors }, register }) => {
  const isUnique = useIsUnique();

  return (
    <SimpleGrid columns={2} gap={6}>
      <FormControl as={GridItem} colSpan={2} isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Nombre</FormLabel>
        <Input
          id="name"
          placeholder="Nombre"
          {...register('name', {
            required: 'Este campo es requerido.',
            validate: (name) => isUnique(name, category?.id),
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

interface IProps extends UseFormReturn<Category> {
  category?: Category;
}

export { Form as SubCategoryForm };
