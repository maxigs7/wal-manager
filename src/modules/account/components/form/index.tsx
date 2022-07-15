import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

import { Account, DEFAULT_ACCOUNT_TYPE, DEFAULT_CURRENCY } from '@models';
import { InputCurrency, Switch } from '@shared';

import { useAccountIsUnique } from '../../hooks';
import CurrencySelectControl from '../currency-select-control';
import AccountTypeRadioGroup from '../type-radio-group';

interface IProps extends UseFormReturn<Account> {
  id?: string;
}

const Form: React.FC<IProps> = ({ control, formState: { errors }, id, register }) => {
  const isUnique = useAccountIsUnique();
  return (
    <SimpleGrid columns={2} gap={6}>
      <FormControl as={GridItem} colSpan={2} isInvalid={!!errors.name}>
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

      <FormControl as={GridItem} isInvalid={!!errors.currency}>
        <FormLabel htmlFor="currency">Moneda</FormLabel>
        <CurrencySelectControl
          control={control}
          defaultValue={DEFAULT_CURRENCY}
          id="currency"
          name="currency"
        />
        <FormErrorMessage>{errors.currency && errors.currency.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.initialAmount}>
        <FormLabel htmlFor="initialAmount">Monto</FormLabel>
        <InputCurrency
          control={control}
          id="initialAmount"
          name="initialAmount"
          placeholder="Ingrese un monto inicial"
        />
        <FormErrorMessage>{errors.initialAmount && errors.initialAmount.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.type}>
        <FormLabel htmlFor="type">Tipo</FormLabel>
        <AccountTypeRadioGroup
          control={control}
          defaultValue={DEFAULT_ACCOUNT_TYPE}
          id="type"
          name="type"
        />
        <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.isDefault}>
        <Switch control={control} id="isDefault" name="isDefault">
          Seleccionar por defecto
        </Switch>
        <FormErrorMessage>{errors.isDefault && errors.isDefault.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

export default Form;
