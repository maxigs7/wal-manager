import React from 'react';
import { NavLink } from 'react-router-dom';

import { Flex, Heading, IconButton } from '@chakra-ui/react';

import { Icon } from '@lib/chakra-ui';

import { useSidebar } from '../context';

export const SidebarHeader: React.FC = React.memo(() => {
  const { close, isOpen } = useSidebar();

  return (
    <Flex align="center" justify="space-between" p={4} w="full">
      <IconButton
        aria-expanded={isOpen}
        aria-label="Close Sidebar"
        display={{ lg: 'none' }}
        h={6}
        icon={<Icon icon="arrow-left" />}
        onClick={close}
        textDecor="none"
        variant="link"
        w={6}
      />
      <Heading as={NavLink} flex="1" size="md" textAlign={{ lg: 'center' }} to="/" exact>
        Wal Manager
      </Heading>
    </Flex>
  );
});
