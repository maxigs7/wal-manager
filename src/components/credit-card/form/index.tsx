import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

import { CreditCardTypeSelect } from '@components';
import { CreditCard, useCreditCardIsUnique } from '@models';

const Form: React.FC<IProps> = ({ cc, control, formState: { errors }, register }) => {
  const isUnique = useCreditCardIsUnique();
  return (
    <SimpleGrid columns={2} gap={6}>
      <FormControl as={GridItem} colSpan={2} isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Nombre</FormLabel>
        <Input
          id="name"
          placeholder="Nombre"
          {...register('name', {
            required: 'Este campo es requerido.',
            validate: (name) => isUnique(name, cc?.id),
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.type}>
        <FormLabel htmlFor="type">Tipo</FormLabel>
        <CreditCardTypeSelect
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

interface IProps extends UseFormReturn<CreditCard> {
  cc?: CreditCard;
}

export { Form as CreditCardForm };
