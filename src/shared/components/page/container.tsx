import { Box } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const Page: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box h="full" w="full">
      {children}
    </Box>
  );
};

export { Page };
