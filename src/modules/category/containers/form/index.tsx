import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormErrorMessage, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';

import { Category } from '@app/api/categories';

const Form: React.FC<IProps> = ({ formState: { errors }, register }) => {
  return (
    <SimpleGrid as="form" columns={2} gap={6}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Nombre</FormLabel>
        <Input
          id="name"
          placeholder="Nombre"
          {...register('name', {
            required: 'Este campo es requerido.',
            minLength: { value: 4, message: 'Debe contenter al menos 4 caracteres.' },
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="categoryType">Tipo</FormLabel>
        <Input
          id="categoryType"
          placeholder="Tipo"
          readOnly
          {...register('categoryType', {
            required: 'Este campo es requerido.',
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.color}>
        <FormLabel htmlFor="color">Color</FormLabel>
        <Input
          id="color"
          placeholder="Color"
          {...register('color', {
            required: 'Este campo es requerido.',
            minLength: { value: 4, message: 'Debe contenter al menos 4 caracteres.' },
          })}
        />
        <FormErrorMessage>{errors.color && errors.color.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.icon}>
        <FormLabel htmlFor="icon">Icono</FormLabel>
        <Input
          id="icon"
          placeholder="Icono"
          {...register('icon', {
            required: 'Este campo es requerido.',
            minLength: { value: 4, message: 'Debe contenter al menos 4 caracteres.' },
          })}
        />
        <FormErrorMessage>{errors.icon && errors.icon.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

type IProps = UseFormReturn<Category>;

export default Form;
