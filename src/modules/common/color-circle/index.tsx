import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

type Sizes = 'xs' | 'sm' | 'md' | 'lg';
const SizeMap: { [size in Sizes]: number } = { xs: 2, sm: 4, md: 8, lg: 12 };

const ColorCircle: React.FC<IProps> = ({ children, size = 'sm', ...props }) => (
  <Flex
    h={SizeMap[size]}
    rounded="full"
    w={SizeMap[size]}
    {...props}
    alignItems="center"
    justifyContent="center"
  >
    {children}
  </Flex>
);

interface IProps extends FlexProps {
  size?: Sizes;
}

export default React.memo(ColorCircle);
