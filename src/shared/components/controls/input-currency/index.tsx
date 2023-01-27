import React from 'react';

import {
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  NumberInputProps,
} from '@chakra-ui/react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

import { Icon } from '../../icon';

interface IProps extends Omit<NumberInputProps, 'onChange'> {
  control: Control<any>;
  defaultValue?: number;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: Omit<Partial<RegisterOptions>, 'valueAsNumber'>;
}

const InputCurrency = React.forwardRef<HTMLInputElement, IProps>(
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
              precision={2}
              type="numeric"
              ref={(e: HTMLInputElement) => {
                refField(e);
                if (ref != null && typeof ref !== 'function') {
                  ref.current = e;
                } else if (ref != null && typeof ref === 'function') {
                  ref(e);
                }
              }}
            >
              <InputLeftElement
                // eslint-disable-next-line react/no-children-prop
                children={<Icon icon="dollar-sign" />}
                color="gray.300"
                fontSize="1.2em"
                pointerEvents="none"
              />
              <NumberInputField
                paddingInlineEnd={10}
                paddingInlineStart={10}
                placeholder={placeholder}
              />
            </NumberInput>
          );
        }}
      />
    );
  },
);

InputCurrency.displayName = 'InputCurrency';

export { InputCurrency };
