import React, { forwardRef } from 'react';

import { inputDisabled } from '@lib/tailwind-css';
import classnames from 'classnames';

import { ButtonShapesType, ButtonSizesType, Shapes, Sizes } from './types';

export interface IBaseButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: ButtonSizesType;
  shape?: ButtonShapesType;
}

const styles = {
  common: [
    'outline-none focus:outline-none',
    'font-bold uppercase',
    'transition-all ease-linearduration-150',
    'inline-flex items-center justify-center',
  ],
  disabled: (disabled: boolean) => disabled && inputDisabled,
  size: (size: ButtonSizesType, shape: ButtonShapesType) => Sizes[size](shape === 'circle'),
  shape: (shape: ButtonShapesType) => Shapes[shape],
};

const BaseButton: React.FC<IBaseButtonProps> = forwardRef<HTMLButtonElement, IBaseButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
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
        ...styles.common,
        styles.disabled(disabled),
        styles.shape(shape),
        styles.size(size, shape),
        className,
      )}
      disabled={disabled}
      ref={ref}
      type={type}
    >
      {children}
    </button>
  ),
);

export default React.memo(BaseButton);
