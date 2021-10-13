import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

import { useAppSelector } from '@app/hooks';
import { Category, isUnique } from '@app/models/categories';
import { selectUserId } from '@app/stores/auth';

const Form: React.FC<IProps> = ({ category, formState: { errors }, register }) => {
  const userId = useAppSelector(selectUserId);

  return (
    <SimpleGrid columns={2} gap={6}>
      <FormControl as={GridItem} colSpan={2} isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Nombre</FormLabel>
        <Input
          id="name"
          placeholder="Nombre"
          {...register('name', {
            required: 'Este campo es requerido.',
            minLength: { value: 4, message: 'Debe contenter al menos 4 caracteres.' },
            validate: (name) => isUnique(name, userId as string, category?.id),
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
