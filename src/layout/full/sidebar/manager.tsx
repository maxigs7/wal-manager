'use client';

import React, { PropsWithChildren, useMemo } from 'react';

import { Flex, useColorModeValue } from '@chakra-ui/react';

import { SIDEBAR_WIDTH } from '../constants';
import { useLayout } from '../provider';

const SidebarManager: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    sidebar: { isOpen, isTouched, getDisclosureProps },
  } = useLayout();
  const { id } = getDisclosureProps();
  const bg = useColorModeValue('gray.200', 'primary.800');
  const color = useColorModeValue('primary.800', 'white');
  const transform = useMemo(() => {
    const open = 'translateX(0)';
    const close = 'translateX(-16rem)';

    if (isTouched) {
      return isOpen ? open : close;
    }

    return {
      base: close,
      lg: open,
    };
  }, [isOpen, isTouched]);

  return (
    <Flex
      bg={bg}
      color={color}
      direction="column"
      h="100%"
      id={id}
      left={{ base: 0, lg: 'auto' }}
      overflowY="auto"
      pos={{ base: 'absolute', lg: 'static' }}
      shadow="md"
      top={{ base: 0, lg: 'auto' }}
      transform={transform}
      transition="transform 0.2s ease-in-out"
      w={SIDEBAR_WIDTH}
    >
      {children}
    </Flex>
  );
};

export { SidebarManager };