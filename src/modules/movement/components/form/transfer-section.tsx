import { useEffect, useState } from 'react';

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
import { AccountSelectControlContainer } from '@/m/account';
import { Currency } from '@/models';
import { InputCurrency } from '@/shared';

import { IProps } from './props';

const TransferSection: React.FC<IProps> = ({ control, formState: { errors } }) => {
  const [destinationCurrency, setDestinationCurrency] = useState<Currency>();
  const [showQuotationAmount, setShowQuotationAmount] = useState<boolean>();
  const accountId = useWatch({
    control,
    name: 'accountId',
  });
  const type = useWatch({
    control,
    name: 'type',
  });
  const currency = useWatch({
    control,
    name: 'currency',
  });

  useEffect(() => {
    setShowQuotationAmount(destinationCurrency && currency && destinationCurrency !== currency);
  }, [currency, destinationCurrency]);

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
        {es.movement.form.transferSection}
      </Text>
      <FormControl
        as={GridItem}
        isInvalid={!!errors.destinationAccountId}
        isRequired={type === 'transfer'}
      >
        <FormLabel htmlFor="destinationAccountId">
          {es.movement.form.destinationAccountId}
        </FormLabel>
        <AccountSelectControlContainer
          control={control}
          excludeId={accountId ? [accountId] : undefined}
          id="destinationAccountId"
          name="destinationAccountId"
          onChange={(account) => setDestinationCurrency(account?.currency)}
          placeholder={es.movement.form.destinationAccountIdPlaceHolder}
          rules={{ required: type === 'transfer' && es.common.validation.required }}
          selectByDefault={false}
        />
        <FormErrorMessage>
          {errors.destinationAccountId && errors.destinationAccountId.message}
        </FormErrorMessage>
      </FormControl>

      {showQuotationAmount && (
        <FormControl
          as={GridItem}
          isInvalid={!!errors.quotationAmount}
          isRequired={showQuotationAmount}
        >
          <FormLabel htmlFor="quotationAmount">{es.movement.form.quotationAmount}</FormLabel>
          <InputCurrency
            control={control}
            id="quotationAmount"
            name="quotationAmount"
            rules={{ required: showQuotationAmount && es.common.validation.required }}
            variant="flushed"
          />
          <FormErrorMessage>
            {errors.quotationAmount && errors.quotationAmount.message}
          </FormErrorMessage>
        </FormControl>
      )}
    </SimpleGrid>
  );
};

export { TransferSection };
