import React from 'react';

import { Heading, VStack } from '@chakra-ui/react';

import { SidebarMenuItem } from './item';
import { mainRoutes, quickRoutes, adminRoutes } from './menu-data';

export const SidebarMenu: React.FC<{ pathname: string }> = ({ pathname }) => (
  <VStack align="stretch" spacing={1} w="full">
    <Heading as="h6" fontWeight="semibold" pl={3} size="xs" textTransform="uppercase">
      Acciones Rapidas
    </Heading>
    {quickRoutes.map((item, index) => (
      <SidebarMenuItem {...item} isActive={pathname === item.path} key={index} />
    ))}

    <Heading as="h6" fontWeight="semibold" pl={3} size="xs" textTransform="uppercase">
      Principal
    </Heading>
    {mainRoutes.map((item, index) => (
      <SidebarMenuItem {...item} isActive={pathname === item.path} key={index} />
    ))}

    <Heading as="h6" fontWeight="semibold" pl={3} size="xs" textTransform="uppercase">
      Admin
    </Heading>
    {adminRoutes.map((item, index) => (
      <SidebarMenuItem {...item} isActive={pathname === item.path} key={index} />
    ))}
  </VStack>
);
