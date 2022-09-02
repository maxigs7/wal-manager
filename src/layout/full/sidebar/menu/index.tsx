import { Flex } from '@chakra-ui/react';
import React from 'react';

import { es } from '@i18n';

import { mainRoutes, adminRoutes } from './data';
import { MenuItem } from './item';
import { Title } from './title';

interface IProps {
  closeSidebar(): void;
}

export const Menu: React.FC<IProps> = ({ closeSidebar }) => (
  <Flex align="stretch" direction="column" gap="1" justifyContent="flex-start" px="3" w="full">
    <Title>{es.menu.overview}</Title>
    {mainRoutes.map((item, index) => (
      <MenuItem {...item} key={index} closeSidebar={closeSidebar} />
    ))}

    <Title>{es.menu.admin}</Title>
    {adminRoutes.map((item, index) => (
      <MenuItem {...item} key={index} closeSidebar={closeSidebar} />
    ))}
  </Flex>
);
