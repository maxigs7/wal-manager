import React from 'react';

import { Heading, VStack } from '@chakra-ui/react';

import { SidebarMenuItem } from './item';
import { mainRoutes, uiRoutes } from './menu-data';

export const SidebarMenu: React.FC<{ pathname: string }> = ({ pathname }) => (
  <VStack align="stretch" w="full">
    <Heading as="h6" fontWeight="semibold" pl={3} size="xs" textTransform="uppercase">
      Principal
    </Heading>
    {mainRoutes.map((item, index) => (
      <SidebarMenuItem {...item} isActive={pathname === item.path} key={index} />
    ))}

    <Heading as="h6" fontWeight="semibold" pl={3} size="xs" textTransform="uppercase">
      UI
    </Heading>
    {uiRoutes.map((item, index) => (
      <SidebarMenuItem {...item} isActive={pathname === item.path} key={index} />
    ))}

    {/* <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">Admin</h3>
    <ul className="my-3">
      {adminRoutes.map((item, index) => (
        <SidebarMenuItem {...item} isActive={pathname === item.path} key={index} />
      ))}
    </ul> */}
  </VStack>
);
