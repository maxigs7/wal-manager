import React, { forwardRef } from 'react';

import classnames from 'classnames';

import { ButtonColors, ButtonSizes, Colors, OutlineColors, Sizes } from './types';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: keyof ButtonSizes;
  color?: keyof ButtonColors;
  rounded?: boolean;
  outlined?: boolean;
}

const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'REGULAR',
      color = 'LIGHTBLUE',
      rounded = false,
      outlined = false,
      className,
      children,
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
      rounded && 'rounded-full',
      !rounded && 'rounded',
      outlined && 'border border-solid',
      !outlined && 'shadow hover:shadow-md',
      Sizes[size],
      outlined && OutlineColors[color],
      !outlined && Colors[color],
    ];

    return (
      <button
        {...htmlAttributes}
        className={classnames(className, ...classes)}
        ref={ref}
        type={type}
      >
        {children}
      </button>
    );
  },
);

export default Button;
