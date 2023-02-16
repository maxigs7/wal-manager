'use client';
import React from 'react';

import { Box } from '@chakra-ui/react';

import { useLayout } from '../provider';

const Backdrop: React.FC = () => {
  const { closeSidebar, isSidebarOpen } = useLayout();

  return (
    <Box
      aria-hidden="true"
      bg="gray.900"
      display={{ lg: 'none' }}
      h={isSidebarOpen ? 'full' : ''}
      onClick={closeSidebar}
      opacity={isSidebarOpen ? 0.3 : 0}
      pointerEvents={isSidebarOpen ? 'auto' : 'none'}
      position="fixed"
      transition="opacity 0.2s"
      w={isSidebarOpen ? 'full' : ''}
    />
  );
};

export { Backdrop };
