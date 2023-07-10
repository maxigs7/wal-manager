import { Box, BoxProps } from '@chakra-ui/react';

export const PageContainer: React.FC<BoxProps> = ({ children, p = '3', ...props }) => (
  <Box p={p} {...props}>
    {children}
  </Box>
);
