import { UseFormReturn } from 'react-hook-form';

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

import { InputCurrency, InputDate, InputNumber } from '@components';
import {
  AccountSelectContainer,
  CategorySelectContainer,
  CreditCardSelectContainer,
} from '@containers';
import { Icon } from '@lib/chakra-ui';
import { CategoryType, Transaction } from '@models';

const Form: React.FC<IProps> = ({ control, formState: { errors }, register }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <SimpleGrid columns={3} gap={6}>
      <FormControl as={GridItem} isInvalid={!!errors.accountId}>
        <FormLabel htmlFor="accountId">Cuenta</FormLabel>
        <AccountSelectContainer
          control={control}
          id="accountId"
          name="accountId"
          placeholder="Seleccione una cuenta"
          rules={{ required: 'Este campo es requerido' }}
        />
        <FormErrorMessage>{errors.accountId && errors.accountId.message}</FormErrorMessage>
      </FormControl>
      <FormControl as={GridItem} isInvalid={!!errors.accountId}>
        <FormLabel htmlFor="categoryId">Categoria</FormLabel>
        <CategorySelectContainer
          control={control}
          id="categoryId"
          name="categoryId"
          placeholder="Seleccione una categoria"
          rules={{ required: 'Este campo es requerido' }}
          type={CategoryType.Expense}
        />
        <FormErrorMessage>{errors.categoryId && errors.categoryId.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.amount}>
        <FormLabel htmlFor="amount">Monto</FormLabel>
        <InputCurrency
          control={control}
          id="amount"
          name="amount"
          placeholder="Ingrese un monto"
          rules={{ required: 'Este campo es requerido' }}
        />
        <FormErrorMessage>{errors.amount && errors.amount.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.date}>
        <FormLabel htmlFor="date">Fecha</FormLabel>
        <InputDate id="date" name="date" placeholder="Fecha" register={register} />
        <FormErrorMessage>{errors.date && errors.date.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} colSpan={2} isInvalid={!!errors.description}>
        <FormLabel htmlFor="description">Descripcion</FormLabel>
        <Input id="description" placeholder="Descripcion" {...register('description')} />
      </FormControl>

      <Box as={GridItem} colSpan={3}>
        <Button
          leftIcon={<Icon icon={isOpen ? 'angle-double-up' : 'angle-double-down'} />}
          mb={6}
          onClick={onToggle}
          size="xs"
          variant="link"
        >
          {isOpen ? 'Ocultar' : 'Ver mas'}
        </Button>
        <Collapse in={isOpen}>
          <SimpleGrid columns={3} gap={6}>
            <FormControl as={GridItem} isInvalid={!!errors.creditCardId}>
              <FormLabel htmlFor="creditCardId">Tarjeta</FormLabel>
              <CreditCardSelectContainer
                control={control}
                id="creditCardId"
                name="creditCardId"
                placeholder="Seleccione una tarjeta"
              />
              <FormErrorMessage>
                {errors.creditCardId && errors.creditCardId.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl as={GridItem} isInvalid={!!errors.feeNumber}>
              <FormLabel htmlFor="feeNumber">Cuotas</FormLabel>
              <InputNumber
                control={control}
                id="feeNumber"
                name="feeNumber"
                placeholder="Ingrese la cantidad de cuotas"
              />
              <FormErrorMessage>{errors.feeNumber && errors.feeNumber.message}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>
        </Collapse>
      </Box>
    </SimpleGrid>
  );
};

interface IProps extends UseFormReturn<Transaction> {
  transaction?: Transaction;
}

export { Form as TransactionCreateForm };
