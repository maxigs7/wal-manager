'use client';

import React from 'react';

import { Icon, IconButton } from '@chakra-ui/react';

import { BarsIcon } from '@/assets';

import { useLayout } from '../provider';

export const Hamburger: React.FC = () => {
  const {
    sidebar: { onToggle, getButtonProps },
  } = useLayout();
  return (
    <IconButton
      {...getButtonProps()}
      aria-label="Open Sidebar"
      colorScheme="accent"
      icon={<Icon as={BarsIcon} boxSize="5" />}
      onClick={onToggle}
      rounded="full"
      shadow="md"
    />
  );
};
