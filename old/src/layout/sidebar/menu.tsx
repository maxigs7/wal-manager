import React from 'react';

import { Heading, VStack } from '@chakra-ui/react';

import { mainRoutes, quickRoutes, adminRoutes } from './menu-data';
import { MenuItem } from './menu-item';

interface IProps {
  closeSidebar(): void;
}

export const Menu: React.FC<IProps> = ({ closeSidebar }) => (
  <VStack align="stretch" spacing={1} w="full">
    <Heading as="h6" fontWeight="semibold" pl={3} size="xs" textTransform="uppercase">
      Acciones Rapidas
    </Heading>
    {quickRoutes.map((item, index) => (
      <MenuItem {...item} closeSidebar={closeSidebar} key={index} />
    ))}

    <Heading as="h6" fontWeight="semibold" pl={3} size="xs" textTransform="uppercase">
      Principal
    </Heading>
    {mainRoutes.map((item, index) => (
      <MenuItem {...item} closeSidebar={closeSidebar} key={index} />
    ))}

    <Heading as="h6" fontWeight="semibold" pl={3} size="xs" textTransform="uppercase">
      Admin
    </Heading>
    {adminRoutes.map((item, index) => (
      <MenuItem {...item} closeSidebar={closeSidebar} key={index} />
    ))}
  </VStack>
);
