import React from 'react';

import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

interface IProps extends Omit<CheckboxProps, 'value' | 'name'> {
  control: Control<any>;
  defaultChecked?: boolean;
  id?: string;
  name: string;
  rules?: RegisterOptions;
}

const ControlledCheckbox = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      children,
      control,
      defaultChecked,
      id,
      name,
      onBlur,
      onChange,
      placeholder,
      rules,
      ...checkboxProps
    },
    ref,
  ) => {
    return (
      <Controller
        control={control}
        defaultValue={defaultChecked}
        name={name}
        render={({ field: { onChange: onChangeField, ref: refField, ...field } }) => {
          const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChangeField(e);
            onChange && onChange(e);
          };

          return (
            <Checkbox
              {...checkboxProps}
              {...field}
              colorScheme="accent"
              defaultChecked={defaultChecked}
              id={id}
              isChecked={field.value}
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
            >
              {children}
            </Checkbox>
          );
        }}
      />
    );
  },
);

ControlledCheckbox.displayName = 'ControlledCheckbox';

export { ControlledCheckbox };
