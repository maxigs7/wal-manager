'use client';

import React from 'react';

import { Icon, IconButton } from '@chakra-ui/react';
import { Bars3Icon } from '@heroicons/react/24/solid';

import { useLayout } from '../provider';

export const Hamburger: React.FC = () => {
  const {
    sidebar: { onToggle, getButtonProps },
  } = useLayout();
  return (
    <IconButton
      {...getButtonProps()}
      aria-label="Open Sidebar"
      colorScheme="gray"
      icon={<Icon as={Bars3Icon} boxSize="6" fill="current" />}
      onClick={onToggle}
      variant="ghost"
    />
  );
};
