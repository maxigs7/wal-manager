import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { ColorsMap, ColorsType } from '@lib/tailwind-css/colors';

/***********************************
 * Size
 ***********************************/
export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'full';

export enum DialogSizes {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  FULL = 'full',
}

export const DialogSizeMap = {
  [DialogSizes.XS]: 'xs:w-96',
  [DialogSizes.SM]: 'xs:w-xs sm:w-sm',
  [DialogSizes.MD]: 'xs:w-xs sm:w-sm md:w-md',
  [DialogSizes.LG]: 'xs:w-xs sm:w-sm md:w-md lg:w-lg',
  [DialogSizes.FULL]: '',
};

/***********************************
 * Type
 ***********************************/
export type Types = 'danger' | 'info' | 'success' | 'warning';

export enum DialogTypes {
  DANGER = 'danger',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export const DialogTypesBackgroundMap = {
  [DialogTypes.DANGER]: 'bg-red-500',
  [DialogTypes.INFO]: 'bg-blue-500',
  [DialogTypes.SUCCESS]: 'bg-green-500',
  [DialogTypes.WARNING]: 'bg-yellow-500',
};

export const DialogTypesButtonColorsMap: { [key in DialogTypes]: ColorsType } = {
  [DialogTypes.DANGER]: ColorsMap.red as ColorsType,
  [DialogTypes.INFO]: ColorsMap.blue as ColorsType,
  [DialogTypes.SUCCESS]: ColorsMap.green as ColorsType,
  [DialogTypes.WARNING]: ColorsMap.yellow as ColorsType,
};

export const DialogTypesIconsMap = {
  [DialogTypes.DANGER]: 'times' as IconProp,
  [DialogTypes.INFO]: 'info' as IconProp,
  [DialogTypes.SUCCESS]: 'check' as IconProp,
  [DialogTypes.WARNING]: 'exclamation-triangle' as IconProp,
};
/***********************************
 * Dialogs
 ***********************************/
export type DialogBase = {
  isOpen: boolean;
  toggle: (isOpen: boolean) => void;
  size?: DialogSizes | Sizes;
  title?: string;
};

export type DialogWithPrimaryAction = {
  action?: () => void;
  actionButtonText?: string;
  type?: DialogTypes | Types;
};

export type DialogWithCancelAction = {
  cancelButtonText?: string;
};

export type DialogGenericProps = DialogBase &
  DialogWithPrimaryAction &
  DialogWithCancelAction & {
    message?: string;
  };
