import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

type Sizes = 'xs' | 'sm' | 'md' | 'lg';
const SizeMap: { [size in Sizes]: number } = { xs: 2, sm: 4, md: 8, lg: 12 };

const ColorCircle: React.FC<IProps> = ({ children, size = 'sm', ...props }) => (
  <Box h={SizeMap[size]} rounded="full" w={SizeMap[size]} {...props}>
    {children}
  </Box>
);

interface IProps extends BoxProps {
  size?: Sizes;
}

export default React.memo(ColorCircle);
