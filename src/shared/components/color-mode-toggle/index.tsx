import { Button, Icon, IconButton, useColorMode } from '@chakra-ui/react';

import { DarkMode, LightMode } from '@/lib/svg';

const ColorModeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Color Mode"
      colorScheme="white"
      icon={<Icon as={colorMode === 'dark' ? LightMode : DarkMode} boxSize="6" fill="current" />}
      onClick={toggleColorMode}
      variant="ghost"
    />
  );
};

export { ColorModeToggle };
