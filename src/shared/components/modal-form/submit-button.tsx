import React from 'react';

import { Button, ButtonProps } from '@chakra-ui/react';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import Icon from '../icon';

interface IProps extends ButtonProps {
  icon?: IconName;
  isSubmitting: boolean;
}

const SubmitButton: React.FC<IProps> = ({
  children,
  colorScheme = 'primary',
  flex = { base: '1', md: 'initial' },
  icon = 'save',
  isSubmitting,
  leftIcon = <Icon icon={icon} />,
  rounded = { base: 'none', md: 'md' },
  ...buttonProps
}) => (
  <Button
    {...buttonProps}
    colorScheme={colorScheme}
    flex={flex}
    isLoading={isSubmitting}
    leftIcon={leftIcon}
    rounded={rounded}
    type="submit"
  >
    {children}
  </Button>
);

export default SubmitButton;
