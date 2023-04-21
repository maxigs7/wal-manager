'use client';

import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

import { Link } from '@/lib/chakra-ui';

import { useLayout } from '../../provider';
import { IMenuItem } from './data';

const styles = {
  active: (isActive: boolean) =>
    isActive
      ? {
          bg: 'accent.500',
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
        ...styles.active(true),
      }}
      {...styles.active(isActive)}
    >
      {children}
    </Link>
  );
};
