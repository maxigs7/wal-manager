import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

import { es } from '@i18n';
import { CreditCard } from '@models';

import { useCreditCardIsUnique } from '../../hooks';
import { CreditCardTypeSelect } from '../type-select';

interface IProps extends UseFormReturn<CreditCard> {
  id?: string;
}

const CreditCardForm: React.FC<IProps> = ({ control, formState: { errors }, id, register }) => {
  const isUnique = useCreditCardIsUnique();
  return (
    <SimpleGrid columns={[1, 2]} gap={6}>
      <FormControl as={GridItem} isInvalid={!!errors.name} isRequired>
        <FormLabel htmlFor="name">{es.creditCard.form.name}</FormLabel>
        <Input
          id="name"
          placeholder={es.creditCard.form.namePlaceholder}
          {...register('name', {
            required: es.common.validation.required,
            validate: (name) => isUnique(name, id),
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.type} isRequired>
        <FormLabel htmlFor="type">{es.creditCard.form.type}</FormLabel>
        <CreditCardTypeSelect
          control={control}
          id="type"
          name="type"
          rules={{
            required: es.common.validation.required,
          }}
        />
        <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

export { CreditCardForm };
