import React, { useMemo } from 'react';

import { HStack } from '@chakra-ui/react';

import { Select as ReactSelect } from '@lib';
import { CreditCard, CreditCardType } from '@models';

import CreditCardInline from '../inline';

type SelectOption = {
  label: string;
  type: CreditCardType;
  value: string;
};

export interface ISelectProps {
  creditCards?: CreditCard[];
  id?: string;
  isClearable?: boolean;
  isLoading: boolean;
  isSearchable?: boolean;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(value?: string): void;
  placeholder?: string;
  value?: string;
}

const Option: React.FC<SelectOption> = ({ label, type }) => (
  <HStack align="center">
    <CreditCardInline iconWidth={25} name={label} type={type} />
  </HStack>
);

const Select = React.forwardRef<any, ISelectProps>(
  (
    {
      creditCards = [],
      id,
      isClearable = true,
      isLoading = false,
      isSearchable = false,
      name,
      onBlur,
      onChange,
      placeholder,
      value,
    },
    ref,
  ) => {
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
        colorScheme="accent"
        formatOptionLabel={Option}
        getOptionValue={(option) => option.value}
        id={id}
        isClearable={isClearable}
        isLoading={isLoading}
        isSearchable={isSearchable}
        menuPlacement="auto"
        menuPortalTarget={document.body}
        name={name}
        onBlur={onBlur}
        onChange={(selected) => onChange && onChange(selected?.value)}
        options={options}
        placeholder={placeholder}
        ref={ref}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        value={options?.find((option) => option.value === value)}
      />
    );
  },
);

export default Select;
