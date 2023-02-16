import { Box, Icon, useColorModeValue } from '@chakra-ui/react';

import { WalletLogo } from '../../assets';

const Logo: React.FC = () => {
  const bg = useColorModeValue('primary.800', 'white');
  const color = useColorModeValue('white', 'primary.800');

  return (
    <Icon
      as={WalletLogo}
      bg={bg}
      boxSize="8"
      color={color}
      fill="current"
      fontSize="xl"
      p="1"
      rounded="lg"
    />
  );
};
export { Logo };
