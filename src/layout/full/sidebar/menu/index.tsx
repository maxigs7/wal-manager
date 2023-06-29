import 'server-only';

import React from 'react';

import { Flex } from '@chakra-ui/react';

import { AnimatePresence } from '@/lib/framer-motion';
import { IconType, MenuItem as MenuItemModel } from '@/models';

import { MenuItem } from './item';

export const Menu: React.FC = async () => {
  // Read the json file
  const menu: MenuItemModel[] = await import('@/m/shared/menu/main.json').then(
    (obj) => obj.default,
  );

  return (
    <AnimatePresence>
      <Flex
        align="stretch"
        direction="column"
        gap="1"
        justifyContent="flex-start"
        pt="3"
        px="3"
        w="full"
      >
        {menu.map((item) => (
          <MenuItem {...item} key={item.id} icon={item.icon as IconType} />
        ))}
      </Flex>
    </AnimatePresence>
  );
};
