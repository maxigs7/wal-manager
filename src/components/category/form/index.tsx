import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

import { ColorSelect, IconSelect } from '@components';
import { Category, useIsUnique } from '@models/categories';

const Form: React.FC<IProps> = ({ category, control, formState: { errors }, register }) => {
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

      <FormControl isInvalid={!!errors.color}>
        <FormLabel htmlFor="color">Color</FormLabel>
        <ColorSelect
          control={control}
          id="color"
          name="color"
          placeholder="Color"
          rules={{
            required: 'Este campo es requerido.',
          }}
        />
        <FormErrorMessage>{errors.color && errors.color.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.icon}>
        <FormLabel htmlFor="icon">Icono</FormLabel>
        <IconSelect
          control={control}
          id="icon"
          name="icon"
          placeholder="Icono"
          rules={{
            required: 'Este campo es requerido.',
          }}
        />
        <FormErrorMessage>{errors.icon && errors.icon.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

interface IProps extends UseFormReturn<Category> {
  category?: Category;
}

export { Form as CategoryForm };
