import React from 'react';

import { Box } from '@chakra-ui/react';

import { useSidebar } from '../context';

export const SidebarBackdrop: React.FC = React.memo(() => {
  const { close, isOpen } = useSidebar();

  return (
    <Box
      aria-hidden="true"
      bg="gray.900"
      display={{ lg: 'none' }}
      h={isOpen ? 'full' : ''}
      onClick={close}
      opacity={isOpen ? 0.3 : 0}
      pointerEvents={isOpen ? 'auto' : 'none'}
      position="fixed"
      transition="opacity 0.2s"
      w={isOpen ? 'full' : ''}
      zIndex="40"
    />
  );
});
