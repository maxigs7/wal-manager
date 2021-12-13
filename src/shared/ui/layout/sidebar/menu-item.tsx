import React from 'react';
import { NavLink } from 'react-router-dom';

import { Badge, Link, Text } from '@chakra-ui/react';

import { Icon, useRouter } from '@shared';

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

interface IProps extends IMenuItem {
  closeSidebar(): void;
}

export const MenuItem: React.FC<IProps> = ({ badge, closeSidebar, exact, icon, title, path }) => {
  const { useResolvedPath, useMatch } = useRouter();
  const resolved = useResolvedPath(path);
  const match = useMatch({ path: resolved.pathname, end: false });
  const isActive = !!match;

  return (
    <Link
      _focus={{ outline: 'none' }}
      _hover={{
        textDecor: 'none',
        ...styles.active(true),
      }}
      alignItems="center"
      as={NavLink}
      display="flex"
      end={exact}
      onClick={closeSidebar}
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
};
