import React, { useMemo } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { HStack } from '@chakra-ui/react';

import { Select as ReactSelect } from '@lib';
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
  const {
    field: { onChange, ref, value, ...inputProps },
  } = useController({
    name,
    control,
    rules,
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
      menuPlacement="auto"
      menuPortalTarget={document.body}
      onChange={(selected) => onChange(selected?.value)}
      options={options}
      placeholder={placeholder}
      ref={ref}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      value={options?.find((option) => option.value === value)}
      isClearable
    />
  );
};

export default Select;
