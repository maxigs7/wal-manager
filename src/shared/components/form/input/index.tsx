import { ComponentProps } from 'react';
import React from 'react';

import { classnames } from '@/lib/classnames';
import { Colors } from '@/theme';

import { styles } from './styles';

type Props = ComponentProps<'input'> & {
  colorScheme?: Colors;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ children, className, colorScheme = Colors.INDIGO, type = 'text', ...props }, ref) => {
    return (
      <>
        <input
          {...props}
          className={classnames(styles.input, styles[colorScheme].input, styles.error.input)}
          placeholder=" "
          ref={ref}
          type={type}
        />
        <label
          className={classnames(styles.label, styles[colorScheme].label, styles.error.label)}
          htmlFor={props.name}
        >
          {children}
        </label>
      </>
    );
  },
);

Input.displayName = 'Input';

export { Input };
