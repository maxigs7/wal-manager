'use client';

import React, { useMemo } from 'react';

import { Select as ReactSelect } from '@/lib/react-select';
import { findIconByValue } from '@/m/shared/form/icon-select/icons';
import { SelectOption } from '@/m/shared/models';
import { CreditCardType } from '@/models';

import { CategoryTag } from '../category-tag';
import { CategoryLookup } from '../models';

export type CategorySelectProps = {
  categories?: CategoryLookup[];
  id?: string;
  isClearable?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(selected?: CategoryLookup): void;
  placeholder?: string;
  value?: CreditCardType;
};

type CategoryOption = SelectOption & CategoryLookup;

const Option: React.FC<CategoryOption> = ({ color, icon, subName, rootName }) => {
  const iconOption = findIconByValue(icon);
  return (
    iconOption && <CategoryTag color={color} icon={iconOption} name={rootName} subName={subName} />
  );
};

const CategorySelect = React.forwardRef<any, CategorySelectProps>(
  (
    {
      categories = [],
      id,
      isClearable = false,
      isLoading = false,
      isSearchable = true,
      name,
      onBlur,
      onChange,
      placeholder,
      value,
    },
    ref,
  ) => {
    const options: CategoryOption[] = useMemo(
      () =>
        categories.map((category: CategoryLookup) => ({
          ...category,
          label: `${category.rootName} ${category.subName}`,
          value: category.id,
        })),
      [categories],
    );

    return (
      <ReactSelect
        formatOptionLabel={Option}
        getOptionValue={(option) => option.value}
        id={id}
        instanceId={id}
        isClearable={isClearable}
        isLoading={isLoading}
        isSearchable={isSearchable}
        name={name}
        onBlur={onBlur}
        onChange={(selected) => onChange && onChange(selected || undefined)}
        options={options}
        placeholder={placeholder}
        ref={ref}
        value={options?.find((option) => option.value === value)}
      />
    );
  },
);

CategorySelect.displayName = 'CategorySelect';

export { CategorySelect };
