import React, { forwardRef } from 'react';

import classnames from 'classnames';

import {
  ButtonColors,
  ButtonShapes,
  ButtonSizes,
  Colors,
  OutlineColors,
  Shapes,
  Sizes,
} from './types';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: ButtonSizes;
  color?: ButtonColors;
  shape?: ButtonShapes;
  outlined?: boolean;
}

const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      color = ButtonColors.PRIMARY,
      disabled,
      outlined = false,
      shape = ButtonShapes.ROUNDED,
      size = ButtonSizes.LARGE,
      type = 'button',
      ...htmlAttributes
    },
    ref,
  ) => {
    const classes = [
      'outline-none',
      'focus:outline-none',
      'uppercase',
      'font-bold',
      'ease-linear',
      'transition-all',
      'duration-150',
      'inline-flex',
      'items-center',
      'justify-center',
      Shapes[shape],
      outlined && 'border border-solid',
      !outlined && 'shadow hover:shadow-md',
      Sizes[size](shape === ButtonShapes.CIRCLE),
      outlined && OutlineColors[color],
      !outlined && Colors[color],
      disabled && 'opacity-60 cursor-not-allowed',
    ];

    return (
      <button
        {...htmlAttributes}
        className={classnames(className, ...classes)}
        disabled={disabled}
        ref={ref}
        type={type}
      >
        {children}
      </button>
    );
  },
);

export default Button;
