import React, { useMemo } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import Select from 'react-select';

import { HStack } from '@chakra-ui/react';

import { CreditCardInline } from '@components';
import { CreditCard, CreditCardType } from '@models';

const CreditCardOption: React.FC<{ label: string; type: CreditCardType; value: string }> = ({
  label,
  type,
}) => (
  <HStack align="center">
    <CreditCardInline iconWidth={25} name={label} type={type} />
  </HStack>
);

const CreditCardSelect: React.FC<ICreditCardSelectProps> = ({
  ccs,
  control,
  id,
  isLoading,
  name,
  placeholder,
  rules,
}) => {
  const {
    field: { onChange, ref, value, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue: null,
  });

  const options = useMemo(
    () =>
      ccs?.map((cc) => ({
        label: cc.name,
        type: cc.type,
        value: cc.id,
      })),
    [ccs],
  );

  return (
    <Select
      {...inputProps}
      formatOptionLabel={CreditCardOption}
      getOptionValue={(option) => option.value}
      id={id}
      isLoading={isLoading}
      isSearchable={false}
      onChange={(selected) => onChange(selected?.value)}
      options={options}
      placeholder={placeholder}
      ref={ref}
      value={options?.find((option) => option.value === value)}
    />
  );
};

interface ICreditCardSelectProps {
  ccs?: CreditCard[];
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  isLoading: boolean;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export { CreditCardSelect };
export type { ICreditCardSelectProps };
