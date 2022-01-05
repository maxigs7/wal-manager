import React from 'react';

import { FlexProps, Flex, SpinnerProps } from '@chakra-ui/react';

import Loader from './loader';

type Props = FlexProps & { spinner?: SpinnerProps };

const ContentLoader: React.FC<Props> = React.memo(
  ({ align = 'center', justify = 'center', p = 5, spinner, ...props }) => (
    <Flex align={align} justify={justify} p={p} {...props}>
      <Loader {...spinner} />
    </Flex>
  ),
);

export default ContentLoader;
