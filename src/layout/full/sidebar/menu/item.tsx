import React from 'react';

import { Badge, Text } from '@chakra-ui/react';

import { IMenuItem } from './data';
import { MenuItemIcon } from './icon';
import { MenuItemLink } from './link';

export const MenuItem: React.FC<IMenuItem> = ({ badge, icon, title, path }) => {
  return (
    <MenuItemLink path={path}>
      <MenuItemIcon icon={icon} path={path} />
      <Text as="span" fontWeight="medium" size="sm">
        {title}
        {badge && (
          <Badge colorScheme="success" fontSize="xx-small" ml={2} variant="subtle">
            {badge}
          </Badge>
        )}
      </Text>
    </MenuItemLink>
  );
};
