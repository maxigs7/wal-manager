import React, { useMemo } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import ReactSelect from 'react-select';

import { HStack } from '@chakra-ui/react';

import { CreditCard, CreditCardType } from '@models';

import CreditCardInline from '../inline';

export interface ISelectProps {
  creditCards?: CreditCard[];
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  isLoading: boolean;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

const Option: React.FC<{ label: string; type: CreditCardType; value: string }> = ({
  label,
  type,
}) => (
  <HStack align="center">
    <CreditCardInline iconWidth={25} name={label} type={type} />
  </HStack>
);

const Select: React.FC<ISelectProps> = ({
  creditCards = [],
  control,
  id,
  isLoading,
  name,
  placeholder,
  rules,
}) => {
  const def = creditCards.find((cc) => cc.isDefault);
  const {
    field: { onChange, ref, value, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue: def?.id,
  });

  const options = useMemo(
    () =>
      creditCards.map((cc) => ({
        label: cc.name,
        type: cc.type,
        value: cc.id,
      })),
    [creditCards],
  );

  return (
    <ReactSelect
      {...inputProps}
      formatOptionLabel={Option}
      getOptionValue={(option) => option.value}
      id={id}
      isLoading={isLoading}
      isSearchable={false}
      onChange={(selected) => onChange(selected?.value)}
      options={options}
      placeholder={placeholder}
      ref={ref}
      value={options?.find((option) => option.value === value)}
      isClearable
    />
  );
};

export default Select;
