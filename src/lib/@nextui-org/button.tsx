import { Button as NextUIButton } from '@nextui-org/react';
import { extendVariants } from '@nextui-org/react';

export const Button = extendVariants(NextUIButton, {
  variants: {
    variant: {
      solid: '',
      bordered: '',
      light: '',
      flat: '',
      faded: '',
      shadow: '',
      ghost: '',
    },
    color: {
      accent: '',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    color: 'default',
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'accent',
      class: 'bg-accent text-accent-foreground',
    },
    {
      variant: 'shadow',
      color: 'accent',
      class: 'shadow-lg shadow-accent/40 bg-accent text-accent-foreground',
    },
    {
      variant: 'bordered',
      color: 'accent',
      class: 'bg-transparent border-accent text-accent',
    },
    {
      variant: 'flat',
      color: 'accent',
      class: 'bg-accent/20 text-accent',
    },
    {
      variant: 'faded',
      color: 'accent',
      class: 'border-default bg-default-100 text-accent',
    },
    {
      variant: 'light',
      color: 'accent',
      class: ['bg-transparent text-accent', 'data-[hover=true]:bg-accent/20'],
    },
    {
      variant: 'ghost',
      color: 'accent',
      class: 'border-accent text-accent hover:!text-accent-foreground hover:!bg-accent',
    },
  ],
});
