import { Button, useColorMode } from '@chakra-ui/react';

import { Icon } from '../icon';

const ColorModeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button colorScheme="white" onClick={toggleColorMode} variant="ghost">
      <Icon icon={colorMode === 'dark' ? 'sun' : 'moon'} />
    </Button>
  );
};

export { ColorModeToggle };
