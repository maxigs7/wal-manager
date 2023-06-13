import React from 'react';

import { Spinner, SpinnerProps } from '@chakra-ui/react';

const Loader: React.FC<SpinnerProps> = ({
  color = 'accent.500',
  emptyColor = 'gray.200',
  speed = '0.65s',
  size = 'xl',
  thickness = '4px',
  ...props
}) => (
  <Spinner
    color={color}
    emptyColor={emptyColor}
    size={size}
    speed={speed}
    thickness={thickness}
    {...props}
  />
);

export { Loader };
