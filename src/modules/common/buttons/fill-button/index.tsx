import React from 'react';

import { ColorsType } from '@lib/tailwind-css/colors';
import classnames from 'classnames';

import BaseButton, { IBaseButtonProps } from '../base';
import { ButtonColors } from './types';

export interface IFillButtonProps extends IBaseButtonProps {
  color?: ColorsType;
}

const styles = {
  button: 'shadow hover:shadow-md',
  color: (color: ColorsType) => ButtonColors[color],
};

const FillButton: React.FC<IFillButtonProps> = ({
  children,
  className,
  color = 'primary',
  ...htmlAttributes
}) => (
  <BaseButton
    {...htmlAttributes}
    className={classnames(styles.button, styles.color(color), className)}
  >
    {children}
  </BaseButton>
);

export default React.memo(FillButton);
