'use client';

import { Icon, IconButton, useColorMode } from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@/assets';

const ColorModeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Color Mode"
      colorScheme="accent"
      icon={<Icon as={colorMode === 'dark' ? SunIcon : MoonIcon} boxSize="5" />}
      onClick={toggleColorMode}
      rounded="full"
      shadow="md"
    />
  );
};

export { ColorModeToggle };
