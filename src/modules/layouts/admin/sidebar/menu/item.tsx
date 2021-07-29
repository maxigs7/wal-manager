import React from 'react';
import { NavLink } from 'react-router-dom';

import { Badge, Link, Text } from '@chakra-ui/react';

import { Icon } from '@lib/chakra-ui';

import { IMenuItem } from './menu-data';

const styles = {
  active: (isActive: boolean) =>
    isActive
      ? {
          bg: 'gray.900',
          color: 'blue.400',
        }
      : {},
  iconActive: (isActive: boolean) =>
    isActive
      ? {
          color: 'blue.400',
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
      color: 'blue.600',
      bg: 'gray.900',
      ...styles.active(isActive),
    }}
    alignItems="center"
    as={NavLink}
    color="gray.200"
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
      _groupHover={{ color: 'blue.600', ...styles.iconActive(isActive) }}
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
        <Badge colorScheme="green" fontSize="xx-small" ml={2} variant="outline">
          {badge}
        </Badge>
      )}
    </Text>
  </Link>
);
