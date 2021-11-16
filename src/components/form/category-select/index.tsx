import React, { useMemo } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import Select from 'react-select';

import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';

import { Icon } from '@lib/chakra-ui';
import { CategoryLookup } from '@models';

const CategoryOption: React.FC<{ label: string; value: string } & CategoryLookup> = ({
  color,
  icon,
  label,
}) => {
  return (
    <Tag bg={color} color="white" size="md" variant="subtle">
      <TagLeftIcon as={Icon} boxSize="12px" icon={icon} />
      <TagLabel>{label}</TagLabel>
    </Tag>
  );
};

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
        label: `${category.rootName}${category.subName ? ` > ${category.subName}` : ''}`,
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
