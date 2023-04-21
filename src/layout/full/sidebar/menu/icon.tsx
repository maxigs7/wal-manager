'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { Icon as ChakraIcon } from '@chakra-ui/react';
import {
  BuildingLibraryIcon,
  ScaleIcon,
  ChartBarIcon,
  WrenchIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

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
      return BuildingLibraryIcon;
    case 'bills':
      return DocumentTextIcon;
    case 'dashboard':
      return ChartBarIcon;
    case 'investments':
      return ChartBarIcon;
    case 'invoices':
      return DocumentTextIcon;
    case 'loans':
      return ScaleIcon;
    case 'settings':
      return WrenchIcon;
    default:
      return null;
  }
};

export const MenuItemIcon: React.FC<Props> = ({ icon, path }) => {
  const pathname = usePathname();
  const isActive = pathname?.startsWith(path) || false;
  const Icon = getIcon(icon);

  return (
    Icon && (
      <ChakraIcon
        _groupHover={{ ...styles.iconActive(true) }}
        as={Icon}
        h={6}
        mr={3}
        w={6}
        {...styles.iconActive(isActive)}
      />
    )
  );
};
