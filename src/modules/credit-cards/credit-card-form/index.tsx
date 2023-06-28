'use client';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { es } from '@/i18n';
import { CreditCardTypeSelectControl } from '@/m/shared/controls/credit-card-type-select';
import { InputControl } from '@/m/shared/controls/input';

import { CreditCardFormType } from '../models/credit-card';

const CreditCardForm: React.FC = () => {
  const bg = useColorModeValue('white', 'primary.900');
  const {
    control,
    formState: { errors },
  } = useFormContext<CreditCardFormType>();

  return (
    <SimpleGrid bg={bg} columns={[1, 2]} gap={6} p="3" rounded="lg" shadow="md">
      <FormControl as={GridItem} isInvalid={!!errors.name} isRequired>
        <FormLabel htmlFor="name">{es.creditCard.form.name}</FormLabel>
        <InputControl
          control={control}
          id="name"
          name="name"
          placeholder={es.creditCard.form.namePlaceholder}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.type} isRequired>
        <FormLabel htmlFor="type">{es.creditCard.form.type}</FormLabel>
        <CreditCardTypeSelectControl
          control={control}
          id="type"
          name="type"
          placeholder={es.creditCard.form.type}
        />
        <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

export { CreditCardForm };
