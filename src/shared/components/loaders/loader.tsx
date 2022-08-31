import { Spinner, SpinnerProps } from '@chakra-ui/react';
import React from 'react';

const Loader: React.FC<SpinnerProps> = ({
  color = 'accent.400',
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
