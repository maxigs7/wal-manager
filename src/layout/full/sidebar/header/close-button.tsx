'use client';

import React from 'react';

import { Icon, IconButton } from '@chakra-ui/react';

import { ArrowLeftIcon } from '@/lib/heroicons';

import { useLayout } from '../../provider';

const CloseButton: React.FC = () => {
  const {
    sidebar: { onClose, getButtonProps },
  } = useLayout();

  return (
    <IconButton
      {...getButtonProps()}
      aria-label="Close Sidebar"
      display={{ base: 'flex', lg: 'none' }}
      icon={<Icon as={ArrowLeftIcon} boxSize="6" />}
      onClick={onClose}
      variant="ghost"
    />
  );
};

export { CloseButton };
