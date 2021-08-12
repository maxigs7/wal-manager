import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

const ColorCircle: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box h={8} rounded="full" w={8} {...props}>
    {children}
  </Box>
);

export default React.memo(ColorCircle);
