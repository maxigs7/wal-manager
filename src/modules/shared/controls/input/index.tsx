'use client';

import React from 'react';

import { Input as ChakraInput, InputProps } from '@chakra-ui/react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

type Props = Omit<InputProps, 'value' | 'name'> & {
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
};

const InputControl = React.forwardRef<HTMLInputElement, Props>(
  (
    { control, defaultValue = '', id, name, onBlur, onChange, placeholder, rules, ...inputProps },
    ref,
  ) => {
    return (
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        rules={rules}
        render={({ field: { onChange: onChangeField, ref: refField, ...field } }) => {
          const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChangeField(e);
            onChange && onChange(e);
          };

          return (
            <ChakraInput
              {...inputProps}
              {...field}
              id={id}
              onBlur={onBlur}
              onChange={onChangeHandler}
              placeholder={placeholder}
              ref={(e: HTMLInputElement) => {
                refField(e);
                if (ref != null && typeof ref !== 'function') {
                  ref.current = e;
                } else if (ref != null && typeof ref === 'function') {
                  ref(e);
                }
              }}
            />
          );
        }}
      />
    );
  },
);

InputControl.displayName = 'InputControl';

export { InputControl };
