import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

const Card: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box bg="white" borderRadius="lg" borderWidth="1px" overflow="hidden" shadow="md" {...props}>
    {children}
  </Box>
);

export default Card;
