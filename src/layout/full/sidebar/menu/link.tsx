'use client';

import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

import { useColorModeValue, useMediaQuery } from '@chakra-ui/react';

import { Link } from '@/lib/chakra-ui';
import { MenuItem } from '@/models';

import { useLayout } from '../../provider';

const styles = {
  active: (isActive: boolean, bg: string, color: string) =>
    isActive
      ? {
          bg,
          color,
        }
      : {},
};

export type MenuItemLinkProps = Pick<MenuItem, 'href'> & PropsWithChildren;

export const MenuItemLink = React.forwardRef<HTMLAnchorElement, MenuItemLinkProps>(
  ({ children, href }, ref) => {
    const bg = useColorModeValue('accent.400', 'accent.200');
    const color = useColorModeValue('white', 'gray.800');
    const [isLg] = useMediaQuery('(min-width: 960px)');
    const {
      sidebar: { onClose },
    } = useLayout();
    const pathname = usePathname();
    const isActive = pathname?.startsWith(href) || false;
    const onClick = () => {
      if (!isLg) onClose();
    };

    return (
      <Link
        _focus={{ outline: 'none' }}
        alignItems="center"
        display="flex"
        flexWrap="nowrap"
        gap="3"
        href={href}
        onClick={onClick}
        opacity="0"
        outline="none"
        p="3"
        prefetch={false}
        ref={ref}
        role="group"
        rounded="md"
        transition="all 0.3s"
        _hover={{
          textDecor: 'none',
          ...styles.active(true, bg, color),
        }}
        {...styles.active(isActive, bg, color)}
      >
        {children}
      </Link>
    );
  },
);

MenuItemLink.displayName = 'MenuItemLink';
