import React, { useMemo } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { Select as ReactSelect } from '@lib';
import { CategoryLookup } from '@models';

import Tag from '../tag';

export interface ISelectProps {
  categories?: CategoryLookup[];
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  isLoading: boolean;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

const Option: React.FC<{ label: string; value: string } & CategoryLookup> = ({
  color,
  icon,
  subName,
  rootName,
}) => <Tag color={color} icon={icon} name={rootName} subName={subName} />;

const Select: React.FC<ISelectProps> = ({
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
      categories?.map((category: CategoryLookup) => ({
        ...category,
        label: `${category.rootName} ${category.subName}`,
        value: category.id,
      })),
    [categories],
  );

  return (
    <ReactSelect
      {...inputProps}
      formatOptionLabel={Option}
      getOptionValue={(option) => option.value}
      id={id}
      isLoading={isLoading}
      onChange={(selected) => onChange(selected?.value)}
      options={options}
      placeholder={placeholder}
      ref={ref}
      value={options?.find((option) => option.value === value)}
    />
  );
};

export default Select;
