'use client';
import React from 'react';

import { Box } from '@chakra-ui/react';

import { useLayout } from '../provider';

const Backdrop: React.FC = () => {
  const {
    sidebar: { isOpen, onClose },
  } = useLayout();

  return (
    <Box
      aria-hidden="true"
      bg="gray.900"
      display={{ lg: 'none' }}
      h={isOpen ? 'full' : ''}
      onClick={onClose}
      opacity={isOpen ? 0.3 : 0}
      pointerEvents={isOpen ? 'auto' : 'none'}
      position="fixed"
      transition="opacity 0.2s"
      w={isOpen ? 'full' : ''}
    />
  );
};

export { Backdrop };
