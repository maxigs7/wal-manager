import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const Error: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box bg="danger.200" color="danger.700" px="4" py="2" rounded="md" w="full">
      {children}
    </Box>
  );
};

export default Error;