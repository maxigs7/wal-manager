'use client';

import React from 'react';

import { Icon, IconButton } from '@chakra-ui/react';

import { CloseIcon } from '@/m/shared/icons';

import { useLayout } from '../../provider';

const CloseButton: React.FC = () => {
  const {
    sidebar: { onClose, getButtonProps },
  } = useLayout();

  return (
    <IconButton
      {...getButtonProps()}
      aria-label="Close Sidebar"
      colorScheme="white"
      display={{ base: 'flex', lg: 'none' }}
      icon={<Icon as={CloseIcon} boxSize="6" />}
      onClick={onClose}
      variant="ghost"
    />
  );
};

export { CloseButton };
