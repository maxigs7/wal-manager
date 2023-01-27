import React, { PropsWithChildren } from 'react';

import { Box } from '@chakra-ui/react';

const Page: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box h="full" w="full">
      {children}
    </Box>
  );
};

export { Page };
