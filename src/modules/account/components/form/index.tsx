import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

import { es } from '@/i18n';
import { QuotationSelectControlContainer } from '@/m/quotation';
import { AccountInsert, Currency, DEFAULT_ACCOUNT_TYPE, DEFAULT_CURRENCY } from '@/models';
import { ControlledInput, SwitchControl } from '@/shared';

import { useAccountIsUnique } from '../../hooks';
import { SelectCurrencyControl } from '../select-currency-control';
import { AccountTypeRadioGroup } from '../type-radio-group';


interface IProps extends UseFormReturn<AccountInsert> {
  currency?: Currency;
  id?: string;
}

const AccountForm: React.FC<IProps> = ({ control, currency, formState: { errors }, id }) => {
  const isUnique = useAccountIsUnique();

  return (
    <SimpleGrid columns={[1, 2, 3]} gap={6}>
      <FormControl as={GridItem} colSpan={[1, 2]} isInvalid={!!errors.name} order="1" isRequired>
        <FormLabel htmlFor="name">{es.account.form.name}</FormLabel>
        <ControlledInput
          control={control}
          id="name"
          name="name"
          placeholder={es.account.form.namePlaceholder}
          rules={{
            required: es.common.validation.required,
            validate: (name) => isUnique(name, id),
          }}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.isPrimary} order={{ base: '5', md: '2' }}>
        <SwitchControl control={control} id="isPrimary" name="isPrimary">
          {es.account.form.isPrimary}
        </SwitchControl>
        <FormErrorMessage>{errors.isPrimary && errors.isPrimary.message}</FormErrorMessage>
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

      {currency === 'usd' && (
        <FormControl as={GridItem} isInvalid={!!errors.quotationId} order={{ base: '3', md: '4' }}>
          <FormLabel htmlFor="quotation"> {es.account.form.quotationId}</FormLabel>
          <QuotationSelectControlContainer
            control={control}
            id="quotationId"
            name="quotationId"
            placeholder={es.account.form.quotationId}
          />
          <FormErrorMessage>{errors.quotationId && errors.quotationId.message}</FormErrorMessage>
        </FormControl>
      )}

      <FormControl
        as={GridItem}
        gridColumnStart={{ base: '1', md: '3' }}
        isInvalid={!!errors.type}
        order={{ base: '4', md: '5' }}
      >
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
