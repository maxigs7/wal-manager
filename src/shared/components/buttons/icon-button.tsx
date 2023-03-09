import React from 'react';

import { BaseButton, BaseButtonProps } from './base/button';

const IconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<BaseButtonProps, 'isIconButton' | 'withIcon'>
>((props, ref) => <BaseButton {...props} isIconButton={true} ref={ref} />);

IconButton.displayName = 'IconButton';
export { IconButton };
