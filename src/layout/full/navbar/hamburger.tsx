'use client';

import React from 'react';

import { Icon, IconButton } from '@chakra-ui/react';

import { MenuBars } from '@/lib/svg';

import { useLayout } from '../provider';

export const Hamburger: React.FC = () => {
  const { toggleSidebar } = useLayout();
  return (
    <IconButton
      aria-controls="sidebar"
      aria-label="Open Sidebar"
      display={{ lg: 'none' }}
      icon={<Icon as={MenuBars} fill="current" />}
      onClick={toggleSidebar}
      variant="ghost"
    />
  );
};
