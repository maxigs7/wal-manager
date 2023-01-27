import React from 'react';

import {
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

interface IProps extends Omit<NumberInputProps, 'onChange'> {
  control: Control<any>;
  defaultValue?: number;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: Omit<Partial<RegisterOptions>, 'valueAsNumber'>;
}

const InputNumber = React.forwardRef<HTMLInputElement, IProps>(
  ({ control, defaultValue, id, name, onBlur, placeholder, rules, ...inputProps }, ref) => {
    return (
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field: { onChange: onChangeField, ref: refField, ...field } }) => {
          const onChangeHandler = (valueAsString: string, valueAsNumber: number) => {
            let value: string | number = valueAsNumber;
            if (valueAsString === '' || valueAsString.includes('.')) {
              value = valueAsString;
            }

            onChangeField(value);
          };

          return (
            <NumberInput
              {...inputProps}
              {...field}
              as={InputGroup}
              defaultValue={defaultValue}
              id={id}
              onChange={onChangeHandler}
              type="numeric"
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
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          );
        }}
      />
    );
  },
);

InputNumber.displayName = 'InputNumber';

export { InputNumber };
