'use client';

import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

import { useColorModeValue } from '@chakra-ui/react';

import { Link } from '@/lib/chakra-ui';

import { useLayout } from '../../provider';
import { IMenuItem } from './data';

const styles = {
  active: (isActive: boolean, bg: string) =>
    isActive
      ? {
          bg: bg,
          color: 'white',
        }
      : {},
};

type Props = Pick<IMenuItem, 'path'> & PropsWithChildren;

export const MenuItemLink: React.FC<Props> = ({ children, path }) => {
  const {
    sidebar: { onClose },
  } = useLayout();
  const pathname = usePathname();
  const isActive = pathname?.startsWith(path) || false;
  const bg = useColorModeValue('accent.500', 'accent.800');

  return (
    <Link
      _focus={{ outline: 'none' }}
      alignItems="center"
      display="flex"
      href={path}
      onClick={onClose}
      outline="none"
      p="3"
      prefetch={false}
      role="group"
      rounded="md"
      transition="all 0.3s"
      _hover={{
        textDecor: 'none',
        ...styles.active(true, bg),
      }}
      {...styles.active(isActive, bg)}
    >
      {children}
    </Link>
  );
};
