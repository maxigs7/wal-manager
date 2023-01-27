import React from 'react';

import { FlexProps, Flex, SpinnerProps } from '@chakra-ui/react';

import Loader from './loader';

type Props = FlexProps & { spinner?: SpinnerProps };

const PageLoader: React.FC<Props> = ({
  bg = 'white',
  h = 'full',
  left = 0,
  opacity = 0.75,
  pos = 'fixed',
  spinner,
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
    <Loader {...spinner} />
  </Flex>
);

export default React.memo(PageLoader);
