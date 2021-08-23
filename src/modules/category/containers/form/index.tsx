import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

import { Category } from '@app/api/categories';
import { isUnique } from '@app/api/categories/isUnique';
import { ColorSelect, IconSelect } from '@app/modules/common/form';
import { useAuth } from '@lib/auth';

const Form: React.FC<IProps> = ({ control, formState: { errors }, id, register }) => {
  const { userId } = useAuth();
  console.log(errors);
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
            validate: (name) => isUnique(name, userId as string, id),
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

type IProps = UseFormReturn<Category> & { id?: string };

export default Form;
