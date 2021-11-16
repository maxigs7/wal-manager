import React, { useMemo } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import Select from 'react-select';

import { CategoryInline } from '@components';
import { CategoryLookup } from '@models';

const CategoryOption: React.FC<{ label: string; value: string } & CategoryLookup> = ({
  color,
  icon,
  subName,
  rootName,
}) => <CategoryInline color={color} icon={icon} name={rootName} subName={subName} />;

const CategorySelect: React.FC<ICategorySelectProps> = ({
  categories,
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
      categories?.map((category) => ({
        ...category,
        label: category.rootName,
        value: category.id,
      })),
    [categories],
  );

  return (
    <Select
      {...inputProps}
      formatOptionLabel={CategoryOption}
      getOptionValue={(option) => option.value}
      id={id}
      inputRef={ref}
      isLoading={isLoading}
      isSearchable={false}
      onChange={(selected) => onChange(selected?.value)}
      options={options}
      placeholder={placeholder}
      value={options?.find((option) => option.value === value)}
    />
  );
};

interface ICategorySelectProps {
  categories?: CategoryLookup[];
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  isLoading: boolean;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export { CategorySelect };
export type { ICategorySelectProps };
