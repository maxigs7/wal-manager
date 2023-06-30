'use client';

import React from 'react';

import { Control, RegisterOptions, useController } from 'react-hook-form';

import { ColorSelect, ColorSelectProps } from '../../form/color-select';

export type ColorSelectControlProps = Omit<ColorSelectProps, 'onBlur' | 'onChange'> & {
  control?: Control<any>;
  defaultValue?: string;
  rules?: RegisterOptions;
};

const ColorSelectControl: React.FC<ColorSelectControlProps> = ({
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

  return <ColorSelect {...field} id={id} placeholder={placeholder} />;
};

export { ColorSelectControl };
