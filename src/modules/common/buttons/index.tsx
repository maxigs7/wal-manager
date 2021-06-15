import React, { forwardRef } from 'react';

import { Colors, ColorsName } from '@lib/tailwind-css/colors';
import classnames from 'classnames';

import {
  ButtonColors,
  ButtonOutlineColors,
  ButtonShapes,
  ButtonSizes,
  Shapes,
  Sizes,
} from './types';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: ButtonSizes;
  color?: Colors | ColorsName;
  shape?: ButtonShapes;
  outlined?: boolean;
}

const styles = {
  color: (outlined: boolean, color: Colors | ColorsName) =>
    outlined ? ButtonOutlineColors[color] : ButtonColors[color],
  common: [
    'outline-none focus:outline-none',
    'font-bold uppercase',
    'transition-all ease-linearduration-150',
    'inline-flex items-center justify-center',
  ],
  disabled: (disabled: boolean) => disabled && 'opacity-60 cursor-not-allowed',
  outlined: (outlined: boolean) => (outlined ? 'border border-solid' : 'shadow hover:shadow-md'),
  size: (size: ButtonSizes, shape: ButtonShapes) => Sizes[size](shape === ButtonShapes.CIRCLE),
  shape: (shape: ButtonShapes) => Shapes[shape],
};

const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      color = Colors.PRIMARY,
      disabled = false,
      outlined = false,
      shape = ButtonShapes.ROUNDED,
      size = ButtonSizes.REGULAR,
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