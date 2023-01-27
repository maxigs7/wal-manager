import { useEffect, useMemo } from 'react';

import { FormControl, FormErrorMessage, FormLabel, GridItem, SimpleGrid } from '@chakra-ui/react';
import { useWatch } from 'react-hook-form';

import { es } from '@i18n';
import { ControlledCheckbox, MonthYearControl } from '@shared';

import { NON_EDITABLE_FIELD } from '../../models';
import { MovementTypeSelectControl } from '../type-select-control';
import { CreditSection } from './credit-section';
import { MainSection } from './main-section';
import { IProps } from './props';
import { TransferSection } from './transfer-section';

const MovementFormComponent: React.FC<IProps> = (props) => {
  const {
    control,
    formState: { errors },
    resetField,
  } = props;

  const id = useWatch({
    control: control,
    name: 'id',
  });
  const creditCardId = useWatch({
    control: control,
    name: 'creditCardId',
  });
  const type = useWatch({
    control: control,
    name: 'type',
  });

  const showCredit = useMemo(
    () => (type === 'expenses' || type === 'incomes') && (!id || (id && !!creditCardId)),
    [creditCardId, id, type],
  );
  const showTransfer = useMemo(() => type === 'transfer' && !id, [id, type]);

  useEffect(() => {
    if (!id) {
      resetField('creditCardId');
      resetField('feeNumber');
      resetField('destinationAccountId');
      resetField('quotationAmount');
    }
  }, [id, resetField, type]);

  return (
    <>
      <SimpleGrid columns={[1, null, 2, 3]} gap={6}>
        <FormControl
          as={GridItem}
          isDisabled={!!id && NON_EDITABLE_FIELD.includes('type')}
          isInvalid={!!errors.type}
          isRequired
        >
          <FormLabel htmlFor="type">{es.movement.form.type}</FormLabel>
          <MovementTypeSelectControl
            control={control}
            id="type"
            includeInvestment={type === 'investment'}
            name="type"
            placeholder={es.movement.form.typePlaceHolder}
            rules={{ required: es.common.validation.required }}
          />
          <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
        </FormControl>

        <FormControl as={GridItem} isInvalid={!!errors.type} isRequired>
          <FormLabel htmlFor="monthYear">{es.movement.form.monthYear}</FormLabel>
          <MonthYearControl
            control={control}
            nameMonth="month"
            nameYear="year"
            rules={{ required: es.common.validation.required }}
          />
          <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
        </FormControl>

        <FormControl as={GridItem} isInvalid={!!errors.isPaid}>
          <ControlledCheckbox control={control} height="full" id="isPaid" name="isPaid">
            {es.movement.form.isPaid}
          </ControlledCheckbox>
          <FormErrorMessage>{errors.isPaid && errors.isPaid.message}</FormErrorMessage>
        </FormControl>
      </SimpleGrid>

      <MainSection {...props} />

      {showCredit && <CreditSection {...props} />}
      {showTransfer && <TransferSection {...props} />}
    </>
  );
};

export { MovementFormComponent as MovementForm };
