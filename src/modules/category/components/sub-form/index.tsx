import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

import { Category, CategoryType } from '@models';

import { useCategoryIsUnique } from '../../hooks';

interface IProps extends UseFormReturn<Category> {
  id?: string;
  parentId: string;
  type: CategoryType;
}

const Form: React.FC<IProps> = ({ formState: { errors }, id, parentId, register, type }) => {
  const isUnique = useCategoryIsUnique();

  return (
    <SimpleGrid columns={[1, 2]} gap={6}>
      <FormControl as={GridItem} colSpan={[1, 2]} isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Nombre</FormLabel>
        <Input
          id="name"
          placeholder="Nombre"
          {...register('name', {
            required: 'Este campo es requerido.',
            validate: (name) => isUnique(type, name, id, parentId),
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

export default Form;
