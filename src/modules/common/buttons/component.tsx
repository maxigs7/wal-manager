import React, { forwardRef } from 'react';

import { ColorsType } from '@lib/tailwind-css/colors';
import classnames from 'classnames';

import {
  ButtonColors,
  ButtonOutlineColors,
  ButtonShapesType,
  ButtonSizesType,
  Shapes,
  Sizes,
} from './types';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: ButtonSizesType;
  color?: ColorsType;
  shape?: ButtonShapesType;
  outlined?: boolean;
}

const styles = {
  color: (outlined: boolean, color: ColorsType) =>
    outlined ? ButtonOutlineColors[color] : ButtonColors[color],
  common: [
    'outline-none focus:outline-none',
    'font-bold uppercase',
    'transition-all ease-linearduration-150',
    'inline-flex items-center justify-center',
  ],
  disabled: (disabled: boolean) => disabled && 'opacity-60 cursor-not-allowed',
  outlined: (outlined: boolean) => (outlined ? 'border border-solid' : 'shadow hover:shadow-md'),
  size: (size: ButtonSizesType, shape: ButtonShapesType) => Sizes[size](shape === 'circle'),
  shape: (shape: ButtonShapesType) => Shapes[shape],
};

const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      color = 'primary',
      disabled = false,
      outlined = false,
      shape = 'rounded',
      size = 'md',
      type = 'button',
      ...htmlAttributes
    },
    ref,
  ) => (
    <button
      {...htmlAttributes}
      className={classnames(
        className,
        ...styles.common,
        styles.disabled(disabled),
        styles.outlined(outlined),
        styles.color(outlined, color),
        styles.shape(shape),
        styles.size(size, shape),
      )}
      disabled={disabled}
      ref={ref}
      type={type}
    >
      {children}
    </button>
  ),
);

export default React.memo(Button);
