import { useCallback } from 'react';

import { FormControl, FormErrorMessage, FormLabel, GridItem, SimpleGrid } from '@chakra-ui/react';
import { useWatch } from 'react-hook-form';

import { es } from '@i18n';
import { AccountSelectControlContainer } from '@m/account';
import { CategorySelectControlContainer } from '@m/category';
import { Account } from '@models';
import { ControlledInput, InputCurrency, InputDate } from '@shared';

import { NON_EDITABLE_FIELD } from '../../models';
import { IProps } from './props';

const MainSection: React.FC<IProps> = (props) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = props;

  const id = useWatch({
    control: control,
    name: 'id',
  });

  const onChangeAccount = useCallback(
    (account?: Account) => {
      setValue('currency', account?.currency);
    },
    [setValue],
  );

  return (
    <SimpleGrid columns={[1, null, 2, 3]} gap={6} mt="5">
      <FormControl
        as={GridItem}
        isDisabled={!!id && NON_EDITABLE_FIELD.includes('type')}
        isInvalid={!!errors.accountId}
        isRequired
      >
        <FormLabel htmlFor="accountId">{es.movement.form.accountId}</FormLabel>
        <AccountSelectControlContainer
          control={control}
          id="accountId"
          name="accountId"
          onChange={onChangeAccount}
          placeholder={es.movement.form.accountIdPlaceHolder}
          rules={{ required: es.common.validation.required }}
        />
        <FormErrorMessage>{errors.accountId && errors.accountId.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.categoryId} isRequired>
        <FormLabel htmlFor="categoryId">{es.movement.form.categoryId}</FormLabel>
        <CategorySelectControlContainer
          control={control}
          id="categoryId"
          name="categoryId"
          placeholder={es.movement.form.categoryIdPlaceHolder}
          rules={{ required: es.common.validation.required }}
        />
        <FormErrorMessage>{errors.categoryId && errors.categoryId.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.date} isRequired>
        <FormLabel htmlFor="date">{es.movement.form.date}</FormLabel>
        <InputDate
          control={control}
          id="date"
          name="date"
          rules={{ required: es.common.validation.required }}
        />
        <FormErrorMessage>{errors.date && errors.date.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.amountValue} isRequired>
        <FormLabel htmlFor="amountValue">{es.movement.form.amount}</FormLabel>
        <InputCurrency
          control={control}
          id="amountValue"
          name="amountValue"
          rules={{ required: es.common.validation.required }}
          variant="flushed"
        />
        <FormErrorMessage>{errors.amountValue && errors.amountValue.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} colSpan={[1, null, 2]} isInvalid={!!errors.description}>
        <FormLabel htmlFor="description">{es.movement.form.description}</FormLabel>
        <ControlledInput control={control} defaultValue="" name="description" />
      </FormControl>
    </SimpleGrid>
  );
};

export { MainSection };
