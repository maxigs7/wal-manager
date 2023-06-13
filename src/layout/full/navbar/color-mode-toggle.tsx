'use client';

import { Icon, IconButton, useColorMode } from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@/lib/heroicons';

const ColorModeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Color Mode"
      colorScheme="gray"
      icon={<Icon as={colorMode === 'dark' ? SunIcon : MoonIcon} boxSize="6" fill="current" />}
      onClick={toggleColorMode}
      variant="ghost"
    />
  );
};

export { ColorModeToggle };
