import React from 'react';

import { FlexProps, Flex, Spinner } from '@chakra-ui/react';

const PageLoader: React.FC<FlexProps> = ({
  bg = 'white',
  h = 'full',
  left = 0,
  opacity = 0.75,
  pos = 'fixed',
  top = 0,
  w = 'full',
  zIndex = 50,
  ...props
}) => (
  <Flex
    align="center"
    justify="center"
    {...props}
    bg={bg}
    h={h}
    left={left}
    opacity={opacity}
    pos={pos}
    top={top}
    w={w}
    zIndex={zIndex}
  >
    <Spinner color="blue.500" emptyColor="gray.200" size="xl" speed="0.65s" thickness="4px" />
  </Flex>
);

export default PageLoader;
