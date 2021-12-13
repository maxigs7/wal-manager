import React from 'react';

import { Button } from '@chakra-ui/react';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import { Icon } from '@shared';

interface IProps {
  icon: IconName;
  isSubmitting: boolean;
}

const SubmitButton: React.FC<IProps> = ({ children, icon, isSubmitting }) => (
  <Button
    colorScheme="primary"
    isLoading={isSubmitting}
    leftIcon={<Icon icon={icon} />}
    mr={3}
    type="submit"
  >
    {children}
  </Button>
);

export default SubmitButton;
