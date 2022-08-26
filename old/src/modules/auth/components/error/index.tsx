import { Box } from '@chakra-ui/react';

const Error: React.FC = ({ children }) => {
  return (
    <Box bg="danger.200" color="danger.700" py="3" rounded="md" w="full">
      {children}
    </Box>
  );
};

export default Error;
