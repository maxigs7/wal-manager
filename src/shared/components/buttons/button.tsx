import React from 'react';

import { BaseButton, BaseButtonProps } from './base/button';

const Button = React.forwardRef<HTMLButtonElement, Omit<BaseButtonProps, 'isIconButton'>>(
  (props, ref) => <BaseButton {...props} ref={ref} />,
);

Button.displayName = 'Button';
export { Button };
