'use client';

import { FormControl, FormErrorMessage, FormLabel, GridItem, SimpleGrid } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

import { es } from '@/i18n';
import { CurrencySelectControl } from '@/m/shared/controls/currency-select';
import { InputControl } from '@/m/shared/controls/input';
import { QuotationSelectControl } from '@/m/shared/controls/quotation-select';
import { SwitchControl } from '@/m/shared/controls/switch';
import { AccountInsert, DEFAULT_ACCOUNT_TYPE, DEFAULT_CURRENCY } from '@/models';

import { AccountTypeRadioGroup } from '../account-type-radio';
import { useAccountForm } from './form-provider';

const AccountForm: React.FC = () => {
  const { quotations } = useAccountForm();
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext<AccountInsert>();

  return (
    <SimpleGrid columns={[1, 2, 3]} gap={6}>
      <FormControl as={GridItem} colSpan={[1, 2]} isInvalid={!!errors.name} order="1" isRequired>
        <FormLabel htmlFor="name">{es.account.form.name}</FormLabel>
        <InputControl
          control={control}
          id="name"
          name="name"
          placeholder={es.account.form.namePlaceholder}
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
        <CurrencySelectControl
          control={control}
          defaultValue={DEFAULT_CURRENCY}
          id="currency"
          name="currency"
        />
        <FormErrorMessage>{errors.currency && errors.currency.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        as={GridItem}
        isDisabled={getValues('currency') !== 'usd'}
        isInvalid={!!errors.quotationId}
        order={{ base: '3', md: '4' }}
      >
        <FormLabel htmlFor="quotation"> {es.account.form.quotationId}</FormLabel>
        <QuotationSelectControl
          control={control}
          id="quotationId"
          name="quotationId"
          placeholder={es.account.form.quotationId}
          quotations={quotations}
        />
        <FormErrorMessage>{errors.quotationId && errors.quotationId.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        as={GridItem}
        gridColumnStart={{ base: '1', md: '3' }}
        isInvalid={!!errors.type}
        order={{ base: '4', md: '5' }}
      >
        <FormLabel htmlFor="type"> {es.account.form.type}</FormLabel>
        <Controller
          control={control}
          defaultValue={DEFAULT_ACCOUNT_TYPE}
          name="type"
          render={({ field }) => {
            return <AccountTypeRadioGroup {...field} id="type" />;
          }}
        />

        <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

export { AccountForm };
