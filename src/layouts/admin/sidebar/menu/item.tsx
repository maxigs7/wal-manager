import React from 'react';
import { NavLink } from 'react-router-dom';

import { Badge, Link, Text } from '@chakra-ui/react';

import { Icon } from '@lib/chakra-ui';

import { IMenuItem } from './menu-data';

const styles = {
  active: (isActive: boolean) =>
    isActive
      ? {
          bg: 'crimson.500',
          color: 'white',
        }
      : {},
  iconActive: (isActive: boolean) =>
    isActive
      ? {
          color: 'white',
        }
      : {},
};

export type SidebarMenuItemProps = IMenuItem & {
  isActive: boolean;
};

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  badge,
  exact,
  icon,
  isActive,
  title,
  path,
}) => (
  <Link
    _focus={{ outline: 'none' }}
    _hover={{
      textDecor: 'none',
      ...styles.active(true),
    }}
    alignItems="center"
    as={NavLink}
    display="flex"
    exact={exact}
    outline="none"
    p={3}
    role="group"
    to={path}
    transition="all 0.3s"
    {...styles.active(isActive)}
  >
    <Icon
      _groupHover={{ ...styles.iconActive(true) }}
      h={6}
      icon={icon}
      mr={3}
      w={6}
      fixedWidth
      {...styles.iconActive(isActive)}
    />
    <Text as="span" fontWeight="medium" size="sm">
      {title}
      {badge && (
        <Badge colorScheme="success" fontSize="xx-small" ml={2} variant="subtle">
          {badge}
        </Badge>
      )}
    </Text>
  </Link>
);
