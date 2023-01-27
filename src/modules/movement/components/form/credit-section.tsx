import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useWatch } from 'react-hook-form';

import { es } from '@/i18n';
import { CreditCardSelectControlContainer } from '@/m/creditCard';
import { ControlledCheckbox, InputNumber } from '@/shared';

import { IProps } from './props';


const CreditSection: React.FC<IProps> = ({ control, formState: { errors }, getValues }) => {
  const id = useWatch({ control, name: 'id' });
  const creditCardId = useWatch({ control, name: 'creditCardId' });

  return (
    <SimpleGrid columns={[1, null, 2, 3]} gap={6} mt="5">
      <Text
        as={GridItem}
        borderBottomColor="gray.200"
        borderBottomStyle="solid"
        borderBottomWidth="1px"
        colSpan={[1, null, 2, 3]}
        fontWeight="bold"
        py="3"
        textTransform="uppercase"
      >
        {es.movement.form.creditSection}
      </Text>
      <FormControl
        as={GridItem}
        colSpan={[1, 2, 1]}
        isInvalid={!!errors.creditCardId}
        isRequired={!!id && !!creditCardId}
      >
        <FormLabel htmlFor="creditCardId">{es.movement.form.creditCardId}</FormLabel>
        <CreditCardSelectControlContainer
          control={control}
          id="creditCardId"
          isClearable={!id}
          name="creditCardId"
          placeholder={es.movement.form.creditCardIdPlaceHolder}
          rules={{ required: !!id && es.common.validation.required }}
        />
        <FormErrorMessage>{errors.creditCardId && errors.creditCardId.message}</FormErrorMessage>
      </FormControl>
      <FormControl as={GridItem} isInvalid={!!errors.feeNumber} isRequired={!!creditCardId}>
        <FormLabel htmlFor="feeNumber">{es.movement.form.feeNumber}</FormLabel>
        <InputNumber
          control={control}
          id="feeNumber"
          name="feeNumber"
          rules={{ required: !!creditCardId && es.common.validation.required }}
        />
        <FormErrorMessage>{errors.feeNumber && errors.feeNumber.message}</FormErrorMessage>
      </FormControl>
      {!id && (
        <FormControl as={GridItem} isInvalid={!!errors.createAll}>
          <ControlledCheckbox
            control={control}
            defaultChecked={true}
            height="full"
            id="createAll"
            name="createAll"
          >
            {es.movement.form.createAll}
          </ControlledCheckbox>
          <FormErrorMessage>{errors.createAll && errors.createAll.message}</FormErrorMessage>
        </FormControl>
      )}
    </SimpleGrid>
  );
};

export { CreditSection };
