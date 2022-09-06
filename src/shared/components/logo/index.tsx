import { Box, Icon, useColorModeValue } from '@chakra-ui/react';

import { WalletLogo } from '../../assets';

const Logo: React.FC = () => {
  const bg = useColorModeValue('primary.800', 'white');
  const color = useColorModeValue('white', 'primary.800');

  return (
    <Box
      alignItems="center"
      bg={bg}
      color={color}
      display="inline-flex"
      fontSize="xl"
      justifyContent="center"
      p="2"
      rounded="lg"
    >
      <Icon as={WalletLogo} />
    </Box>
  );
};
export { Logo };
