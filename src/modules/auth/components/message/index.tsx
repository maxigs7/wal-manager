import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  type?: 'danger' | 'success';
}

const AuthMessage: React.FC<IProps> = ({ children, type = 'danger' }) => {
  return (
    <Box bg={`${type}.200`} color={`${type}.700`} px="4" py="2" rounded="md" w="full">
      {children}
    </Box>
  );
};

export default AuthMessage;
