'use client';

import React from 'react';

import { Icon, IconButton } from '@chakra-ui/react';

import { ChevronLeft } from '@/lib/svg';

import { useLayout } from '../../provider';

const CloseButton: React.FC = () => {
  const { closeSidebar, isSidebarOpen } = useLayout();

  return (
    <IconButton
      aria-expanded={isSidebarOpen}
      aria-label="Close Sidebar"
      display={{ lg: 'none' }}
      h={6}
      icon={<Icon as={ChevronLeft} fill="current" />}
      onClick={closeSidebar}
      textDecor="none"
      variant="link"
      w={6}
    />
  );
};

export { CloseButton };
