'use client';

import React from 'react';

import { Control, RegisterOptions, useController } from 'react-hook-form';

import { IconSelect, IconSelectProps } from '../../form/icon-select';

export type IconSelectControlProps = Omit<IconSelectProps, 'onBlur' | 'onChange'> & {
  control?: Control<any>;
  defaultValue?: string;
  rules?: RegisterOptions;
};

const IconSelectControl: React.FC<IconSelectControlProps> = ({
  control,
  defaultValue,
  id,
  name,
  placeholder,
  rules,
}) => {
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return <IconSelect {...field} id={id} placeholder={placeholder} />;
};

export { IconSelectControl };
