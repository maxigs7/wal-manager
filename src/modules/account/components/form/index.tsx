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
import { Account, DEFAULT_ACCOUNT_TYPE, DEFAULT_CURRENCY } from '@models';
import { InputCurrency, SwitchControl } from '@shared';

import { useAccountIsUnique } from '../../hooks';
import { SelectCurrencyControl } from '../select-currency-control';
import { AccountTypeRadioGroup } from '../type-radio-group';

interface IProps extends UseFormReturn<Account> {
  id?: string;
}

const AccountForm: React.FC<IProps> = ({ control, formState: { errors }, id, register }) => {
  const isUnique = useAccountIsUnique();
  return (
    <SimpleGrid columns={[1, 2, 3]} gap={6}>
      <FormControl as={GridItem} colSpan={[1, 2]} isInvalid={!!errors.name} order="1" isRequired>
        <FormLabel htmlFor="name">{es.account.form.name}</FormLabel>
        <Input
          id="name"
          placeholder={es.account.form.namePlaceholder}
          variant="flushed"
          {...register('name', {
            required: es.common.validation.required,
            validate: (name) => isUnique(name, id),
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.isDefault} order={{ base: '5', md: '2' }}>
        <SwitchControl control={control} id="isDefault" name="isDefault">
          {es.account.form.isDefault}
        </SwitchControl>
        <FormErrorMessage>{errors.isDefault && errors.isDefault.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.currency} order={{ base: '2', md: '3' }}>
        <FormLabel htmlFor="currency"> {es.account.form.currency}</FormLabel>
        <SelectCurrencyControl
          control={control}
          defaultValue={DEFAULT_CURRENCY}
          id="currency"
          name="currency"
        />
        <FormErrorMessage>{errors.currency && errors.currency.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.initialAmount} order={{ base: '3', md: '4' }}>
        <FormLabel htmlFor="initialAmount"> {es.account.form.initialAmount}</FormLabel>
        <InputCurrency
          control={control}
          id="initialAmount"
          name="initialAmount"
          placeholder={es.account.form.initialAmountPlaceholder}
          variant="flushed"
        />
        <FormErrorMessage>{errors.initialAmount && errors.initialAmount.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.type} order={{ base: '4', md: '5' }}>
        <FormLabel htmlFor="type"> {es.account.form.type}</FormLabel>
        <AccountTypeRadioGroup
          control={control}
          defaultValue={DEFAULT_ACCOUNT_TYPE}
          id="type"
          name="type"
        />
        <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

export { AccountForm };
