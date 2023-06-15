'use client';

import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

import { useColorModeValue } from '@chakra-ui/react';

import { Link } from '@/lib/chakra-ui';
import { MenuItem } from '@/models';

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
    const pathname = usePathname();
    const isActive = pathname?.startsWith(href.toString()) || false;

    return (
      <Link
        _focus={{ outline: 'none' }}
        alignItems="center"
        display="flex"
        gap="2"
        href={href}
        opacity="0"
        outline="none"
        p="2"
        prefetch={false}
        ref={ref}
        role="group"
        rounded={{ base: 'none', lg: 'md' }}
        transition="all 0.3s"
        w="full"
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
