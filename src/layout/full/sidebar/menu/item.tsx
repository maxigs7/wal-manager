import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { Badge, Link, Text } from '@chakra-ui/react';

import { Icon } from '@/shared';

import { IMenuItem } from './data';


const styles = {
  active: (isActive: boolean) =>
    isActive
      ? {
          bg: 'accent.500',
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

export const MenuItem: React.FC<IProps> = ({ badge, closeSidebar, icon, title, path }) => {
  const router = useRouter();
  const isActive = router.asPath.startsWith(path);

  return (
    <Link
      _focus={{ outline: 'none' }}
      alignItems="center"
      as={NextLink}
      display="flex"
      href={path}
      onClick={closeSidebar}
      outline="none"
      p="3"
      role="group"
      rounded="md"
      transition="all 0.3s"
      _hover={{
        textDecor: 'none',
        ...styles.active(true),
      }}
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
