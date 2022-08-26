import React from 'react';

import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

const Card: React.FC<BoxProps> = React.memo(({ children, ...props }) => {
  const bg = useColorModeValue('white', 'cello.700');
  return (
    <Box bg={bg} borderRadius="lg" borderWidth="1px" overflow="hidden" shadow="md" {...props}>
      {children}
    </Box>
  );
});

export default Card;
