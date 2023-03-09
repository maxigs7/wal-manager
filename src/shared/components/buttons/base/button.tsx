'use client';
import { ComponentProps } from 'react';
import React from 'react';

import { classnames } from '@/lib/classnames';
import { ButtonVariant, Colors, Sizes } from '@/theme';

import { Loader } from '../../loaders';
import { styles } from './styles';

export type BaseButtonProps = ComponentProps<'button'> & {
  block?: boolean;
  colorScheme?: Colors;
  isIconButton?: boolean;
  isLoading?: boolean;
  rounded?: boolean;
  size?: Sizes;
  variant?: ButtonVariant;
  withIcon?: boolean;
};

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      block = false,
      children,
      className,
      colorScheme = Colors.INDIGO,
      isIconButton = false,
      isLoading = false,
      rounded = false,
      size = Sizes.md,
      type = 'button',
      variant = ButtonVariant.SOLID,
      withIcon = false,
      ...props
    },
    ref,
  ) => (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      ref={ref}
      type={type}
      className={classnames(
        styles.button,
        (withIcon || (isLoading && !isIconButton)) && styles.withIcon,
        // SIZE
        !isIconButton && styles[size].button,
        isIconButton && styles[size].icon,
        isIconButton && styles.icon,
        block && 'w-full',
        // VARIANT AND COLOR
        variant !== ButtonVariant.GHOST && styles[variant],
        styles[colorScheme][variant],
        className,
      )}
    >
      {isLoading && <Loader inverse={variant === ButtonVariant.SOLID} size={size} />}
      {!isLoading && children}
    </button>
  ),
);

BaseButton.displayName = 'BaseButton';

export { BaseButton };
