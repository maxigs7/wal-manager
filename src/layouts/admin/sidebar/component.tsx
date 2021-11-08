import React from 'react';

import { Flex, VStack } from '@chakra-ui/react';

import { useRouter } from '@hooks';

import { SidebarBackdrop } from './backdrop';
import { useSidebar } from './context';
import { SidebarHeader } from './header';
import { SidebarMenu } from './menu';

export const Sidebar: React.FC = () => {
  const { pathname } = useRouter();
  const { isOpen } = useSidebar();

  return (
    <Flex w={{ lg: '64' }}>
      {/* Sidebar backdrop (mobile only) */}
      <SidebarBackdrop />

      {/* Sidebar */}
      <VStack
        bg="cello.700"
        color="white"
        h="100%"
        id="sidebar"
        left={{ base: 0, lg: 'auto' }}
        overflowY="auto"
        pos={{ base: 'absolute', lg: 'static' }}
        top={{ base: 0, lg: 'auto' }}
        transform={{
          base: isOpen ? 'translateX(0)' : 'translateX(-16rem)',
          lg: 'translateX(0)',
        }}
        transition="transform 0.2s ease-in-out"
        w="64"
        zIndex={40}
      >
        {/* Sidebar header */}
        <SidebarHeader />
        <SidebarMenu pathname={pathname} />
      </VStack>
    </Flex>
  );
};
