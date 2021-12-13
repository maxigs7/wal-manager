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

import { toCategoryType, CreateTransaction, TransactionType } from '@entities';
import { AccountSelect, CategorySelect, CreditCardSelect } from '@features';
import { Checkbox, Icon, InputCurrency, InputDate, InputNumber } from '@shared';

interface IProps extends UseFormReturn<CreateTransaction> {
  type: TransactionType;
}

const Form: React.FC<IProps> = ({ control, formState: { errors }, getValues, register, type }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <SimpleGrid columns={[1, 2, 3]} gap={6}>
      <FormControl as={GridItem} colSpan={[1, 2, 1]} isInvalid={!!errors.accountId}>
        <FormLabel htmlFor="accountId">Cuenta</FormLabel>
        <AccountSelect
          control={control}
          id="accountId"
          name="accountId"
          placeholder="Seleccione una cuenta"
          rules={{ required: 'Este campo es requerido' }}
        />
        <FormErrorMessage>{errors.accountId && errors.accountId.message}</FormErrorMessage>
      </FormControl>
      <FormControl as={GridItem} colSpan={[1, 2, 1]} isInvalid={!!errors.accountId}>
        <FormLabel htmlFor="categoryId">Categoria</FormLabel>
        <CategorySelect
          control={control}
          id="categoryId"
          name="categoryId"
          placeholder="Seleccione una categoria"
          rules={{ required: 'Este campo es requerido' }}
          type={toCategoryType(type)}
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
        <InputDate
          id="date"
          name="date"
          placeholder="Fecha"
          register={register}
          rules={{ required: 'Este campo es requerido' }}
        />
        <FormErrorMessage>{errors.date && errors.date.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} colSpan={[1, 2]} isInvalid={!!errors.description}>
        <FormLabel htmlFor="description">Descripcion</FormLabel>
        <Input id="description" placeholder="Descripcion" {...register('description')} />
      </FormControl>

      <Box as={GridItem} colSpan={[1, 2, 3]}>
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
          <SimpleGrid columns={[1, 2, 3]} gap={6}>
            <FormControl as={GridItem} colSpan={[1, 2, 1]} isInvalid={!!errors.creditCardId}>
              <FormLabel htmlFor="creditCardId">Tarjeta</FormLabel>
              <CreditCardSelect
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
            <FormControl as={GridItem} isInvalid={!!errors.billedDate}>
              <FormLabel htmlFor="billedDate">Fecha</FormLabel>
              <InputDate
                id="billedDate"
                name="billedDate"
                placeholder="Fecha de inicio"
                register={register}
                rules={{
                  validate: {
                    required: (): string | boolean =>
                      getValues('creditCardId') ? 'Este campo es requerido' : true,
                  },
                }}
              />
              <FormErrorMessage>{errors.billedDate && errors.billedDate.message}</FormErrorMessage>
            </FormControl>
            <FormControl as={GridItem} isInvalid={!!errors.createAll}>
              <Checkbox control={control} defaultChecked={true} id="createAll" name="createAll">
                Crear todas las cuotas
              </Checkbox>
              <FormErrorMessage>{errors.createAll && errors.createAll.message}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>
        </Collapse>
      </Box>
    </SimpleGrid>
  );
};

export default Form;
