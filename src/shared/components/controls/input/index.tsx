import React from 'react';

import { Input, InputProps } from '@chakra-ui/react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

interface IProps extends Omit<InputProps, 'value' | 'name'> {
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

const ControlledInput = React.forwardRef<HTMLInputElement, IProps>(
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
            <Input
              {...inputProps}
              {...field}
              colorScheme="accent"
              id={id}
              onBlur={onBlur}
              onChange={onChangeHandler}
              placeholder={placeholder}
              variant="flushed"
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

ControlledInput.displayName = 'ControlledInput';

export { ControlledInput };
