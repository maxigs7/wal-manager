import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

import { CreditCard } from '@entities';

import { useCreditCardIsUnique } from '../../model/hooks';
import Select from '../type-select';

interface IProps extends UseFormReturn<CreditCard> {
  id?: string;
}

const Form: React.FC<IProps> = ({ control, formState: { errors }, id, register }) => {
  const isUnique = useCreditCardIsUnique();
  return (
    <SimpleGrid columns={[1, 2]} gap={6}>
      <FormControl as={GridItem} colSpan={[1, 2]} isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Nombre</FormLabel>
        <Input
          id="name"
          placeholder="Nombre"
          {...register('name', {
            required: 'Este campo es requerido.',
            validate: (name) => isUnique(name, id),
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.type}>
        <FormLabel htmlFor="type">Tipo</FormLabel>
        <Select
          control={control}
          id="type"
          name="type"
          rules={{
            required: 'Este campo es requerido.',
          }}
        />
        <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

export default Form;
