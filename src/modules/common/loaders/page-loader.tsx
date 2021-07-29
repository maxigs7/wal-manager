import React from 'react';

import { Box, Flex, Spinner } from '@chakra-ui/react';

const PageLoader: React.FC = () => (
  <Box bg="white" h="full" left={0} opacity={0.75} pos="fixed" top={0} w="full" zIndex={50}>
    <Flex align="center" h="full" justify="center" w="full">
      <Spinner color="blue.500" emptyColor="gray.200" size="xl" speed="0.65s" thickness="4px" />
    </Flex>
  </Box>
);

export default PageLoader;
