import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

import { CreditCardTypeSelect, InputNumber } from '@app/components';
import { useAppSelector } from '@app/hooks';
import { CreditCard, isUnique } from '@app/models/credit-cards';
import { selectUserId } from '@app/stores/auth';

const Form: React.FC<IProps> = ({ cc, control, formState: { errors }, register }) => {
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
            validate: (name) => isUnique(name, userId as string, cc?.id),
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

      <FormControl isInvalid={!!errors.closedDay}>
        <FormLabel htmlFor="closedDay">Dia de cierre</FormLabel>
        <InputNumber
          control={control}
          defaultValue={1}
          id="closedDay"
          name="closedDay"
          rules={{
            min: { value: 1, message: 'Debe ser entre 1 y 31.' },
            max: { value: 31, message: 'Debe ser entre 1 y 31.' },
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
