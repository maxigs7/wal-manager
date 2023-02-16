'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { Icon as ChakraIcon } from '@chakra-ui/react';

import { AccountBalance, Balance, Category, CreditCard, Dashboard } from '@/lib/svg';

import { IconType, IMenuItem } from './data';

const styles = {
  iconActive: (isActive: boolean) =>
    isActive
      ? {
          color: 'white',
        }
      : {},
};

type Props = Pick<IMenuItem, 'path' | 'icon'>;

const getIcon = (key: IconType) => {
  switch (key) {
    case 'accounts':
      return AccountBalance;
    case 'categories':
      return Category;
    case 'creditCards':
      return CreditCard;
    case 'dashboard':
      return Dashboard;
    case 'movements':
      return Balance;
    default:
      return null;
  }
};

export const MenuItemIcon: React.FC<Props> = ({ icon, path }) => {
  const pathname = usePathname();
  const isActive = pathname?.startsWith(path) || false;
  const Icon = getIcon(icon);

  return (
    <ChakraIcon
      _groupHover={{ ...styles.iconActive(true) }}
      as={Icon}
      fill="current"
      h={6}
      mr={3}
      w={6}
      {...styles.iconActive(isActive)}
    />
  );
};
