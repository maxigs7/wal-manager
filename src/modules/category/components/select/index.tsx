import React, { useMemo } from 'react';

import { MenuPlacement } from 'chakra-react-select';

import { Select as ReactSelect } from '@/lib';

import { CategoryLookup } from '../../models';
import { CategoryTag } from '../tag';


type SelectOption = { label: string; value: string } & CategoryLookup;

export interface ICategorySelectProps {
  categories?: CategoryLookup[];
  id?: string;
  isClearable?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  menuPlacement?: MenuPlacement;
  menuPortalTarget?: HTMLElement | null;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(selected?: CategoryLookup): void;
  placeholder?: string;
  value?: string;
}

const Option: React.FC<SelectOption> = ({ color, icon, subName, rootName }) => (
  <CategoryTag color={color} icon={icon} name={rootName} subName={subName} />
);

const CategorySelect = React.forwardRef<any, ICategorySelectProps>(
  (
    {
      categories = [],
      id,
      isClearable = false,
      isLoading = false,
      isSearchable = true,
      menuPlacement,
      menuPortalTarget,
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
        categories?.map((category: CategoryLookup) => ({
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
        isClearable={isClearable}
        isLoading={isLoading}
        isSearchable={isSearchable}
        menuPlacement={menuPlacement}
        menuPortalTarget={menuPortalTarget}
        name={name}
        onBlur={onBlur}
        onChange={(selected) => onChange && onChange(selected || undefined)}
        options={options}
        placeholder={placeholder}
        ref={ref}
        value={options?.find((option) => option.value === value)}
        variant="flushed"
      />
    );
  },
);

CategorySelect.displayName = 'CategorySelect';
export { CategorySelect };
