import React from 'react';

import { Spinner, SpinnerProps } from '@chakra-ui/react';

const Loader: React.FC<SpinnerProps> = ({
  color = 'blue.500',
  emptyColor = 'gray.200',
  label = 'loading...',
  size = 'xl',
  speed = '0.65s',
  thickness = '4px',
  ...props
}) => (
  <Spinner
    color={color}
    emptyColor={emptyColor}
    label={label}
    size={size}
    speed={speed}
    thickness={thickness}
    {...props}
  />
);

export default React.memo(Loader);
