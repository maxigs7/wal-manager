import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { es } from '@i18n';
import { AccountSelectControlContainer } from '@m/account';
import { CategorySelectControlContainer } from '@m/category';
import { CreditCardSelectControlContainer } from '@m/creditCard';
import { toCategoryType, TransactionForm, TransactionType } from '@models';
import {
  Checkbox,
  Icon,
  InputCurrency,
  InputDate,
  InputNumber,
  IS_RECURRING_ENABLED,
} from '@shared';

interface IProps extends UseFormReturn<TransactionForm> {
  accountId?: string;
  type: TransactionType;
}

const TransactionForm: React.FC<IProps> = ({
  accountId,
  control,
  formState: { errors },
  getValues,
  register,
  type,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const isEditing = !!getValues('id') || !!getValues('parentTransactionId');
  const ref = useRef<HTMLDivElement>(null);

  return (
    <SimpleGrid columns={[1, null, 2, 3]} gap={6}>
      {!accountId && (
        <FormControl as={GridItem} isInvalid={!!errors.accountId} isRequired>
          <FormLabel htmlFor="accountId">{es.transaction.form.accountId}</FormLabel>
          <AccountSelectControlContainer
            control={control}
            id="accountId"
            name="accountId"
            placeholder={es.transaction.form.accountIdPlaceHolder}
            rules={{ required: es.common.validation.required }}
          />
          <FormErrorMessage>{errors.accountId && errors.accountId.message}</FormErrorMessage>
        </FormControl>
      )}

      <FormControl as={GridItem} isInvalid={!!errors.date} isRequired>
        <FormLabel htmlFor="date">{es.transaction.form.date}</FormLabel>
        <InputDate
          control={control}
          id="date"
          name="date"
          rules={{ required: es.common.validation.required }}
        />
        <FormErrorMessage>{errors.date && errors.date.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.categoryId}>
        <FormLabel htmlFor="categoryId">{es.transaction.form.categoryId}</FormLabel>
        <CategorySelectControlContainer
          control={control}
          id="categoryId"
          name="categoryId"
          placeholder={es.transaction.form.categoryIdPlaceHolder}
          rules={{ required: es.common.validation.required }}
          type={toCategoryType(type)}
        />
        <FormErrorMessage>{errors.categoryId && errors.categoryId.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.amount}>
        <FormLabel htmlFor="amount">{es.transaction.form.amount}</FormLabel>
        <InputCurrency
          control={control}
          id="amount"
          name="amount"
          rules={{ required: es.common.validation.required }}
        />
        <FormErrorMessage>{errors.amount && errors.amount.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} colSpan={[null, null, 2]} isInvalid={!!errors.description}>
        <FormLabel htmlFor="description">{es.transaction.form.description}</FormLabel>
        <Input id="description" {...register('description')} />
      </FormControl>

      {IS_RECURRING_ENABLED && !isEditing && (
        <FormControl as={GridItem} isInvalid={!!errors.isRecurring}>
          <Checkbox control={control} id="isRecurring" name="isRecurring">
            {es.transaction.form.isRecurring}
          </Checkbox>
          <FormErrorMessage>{errors.isRecurring && errors.isRecurring.message}</FormErrorMessage>
        </FormControl>
      )}

      {isEditing && (
        <FormControl as={GridItem} isInvalid={!!errors.isPaid}>
          <Checkbox control={control} id="isPaid" name="isPaid">
            {es.transaction.form.isPaid}
          </Checkbox>
          <FormErrorMessage>{errors.isPaid && errors.isPaid.message}</FormErrorMessage>
        </FormControl>
      )}

      <Box as={GridItem} colSpan={[1, null, 2, 3]} ref={ref}>
        <Button
          leftIcon={<Icon icon={isOpen ? 'angle-double-up' : 'angle-double-down'} />}
          mb={6}
          onClick={onToggle}
          size="xs"
          variant="link"
        >
          {isOpen ? es.transaction.form.seeLess : es.transaction.form.seeMore}
        </Button>
        <Collapse in={isOpen}>
          <SimpleGrid columns={[1, 2, 3]} gap={6}>
            <FormControl as={GridItem} colSpan={[1, 2, 1]} isInvalid={!!errors.creditCardId}>
              <FormLabel htmlFor="creditCardId">{es.transaction.form.creditCardId}</FormLabel>
              <CreditCardSelectControlContainer
                control={control}
                id="creditCardId"
                menuPlacement="top"
                menuPortalTarget={ref.current}
                name="creditCardId"
                placeholder={es.transaction.form.creditCardIdPlaceHolder}
              />
              <FormErrorMessage>
                {errors.creditCardId && errors.creditCardId.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl as={GridItem} isInvalid={!!errors.feeNumber}>
              <FormLabel htmlFor="feeNumber">{es.transaction.form.feeNumber}</FormLabel>
              <InputNumber control={control} id="feeNumber" name="feeNumber" />
              <FormErrorMessage>{errors.feeNumber && errors.feeNumber.message}</FormErrorMessage>
            </FormControl>
            <FormControl as={GridItem} isInvalid={!!errors.billedDate}>
              <FormLabel htmlFor="billedDate">{es.transaction.form.billedDate}</FormLabel>
              <InputDate
                control={control}
                id="billedDate"
                name="billedDate"
                rules={{
                  validate: {
                    required: (value): string | boolean =>
                      getValues('creditCardId') && !value ? es.common.validation.required : true,
                  },
                }}
              />
              <FormErrorMessage>{errors.billedDate && errors.billedDate.message}</FormErrorMessage>
            </FormControl>

            {!isEditing && (
              <FormControl as={GridItem} isInvalid={!!errors.createAll}>
                <Checkbox control={control} defaultChecked={true} id="createAll" name="createAll">
                  {es.transaction.form.createAll}
                </Checkbox>
                <FormErrorMessage>{errors.createAll && errors.createAll.message}</FormErrorMessage>
              </FormControl>
            )}
          </SimpleGrid>
        </Collapse>
      </Box>
    </SimpleGrid>
  );
};

export { TransactionForm };
