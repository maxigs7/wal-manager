import React from 'react';

import classnames from '@lib/classnames';
import { ColorsType } from '@lib/tailwind-css/colors';

export interface IColorCircleProps extends React.ComponentProps<'span'> {
  color: ColorsType;
}

const ColorCircle: React.FC<IColorCircleProps> = ({ children, className, color }) => (
  <span
    className={classnames(
      className,
      color !== 'black' && `bg-${color}-600`,
      color === 'black' && 'bg-black',
      'rounded-full w-8 h-8 inline-block',
    )}
  >
    {children}
  </span>
);

export default React.memo(ColorCircle);
