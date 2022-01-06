import React from 'react';

import { Button, ButtonProps } from '@chakra-ui/react';

const SubmitButton: React.FC<ButtonProps> = ({
  flex = { base: 1, md: 'initial' },
  rounded = { base: 'none', md: 'md' },
  ...props
}) => (
  <Button {...props} flex={flex} rounded={rounded}>
    Cancel
  </Button>
);

export default SubmitButton;
