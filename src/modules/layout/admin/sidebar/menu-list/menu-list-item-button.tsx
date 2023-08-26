'use client';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useCallback } from 'react';

import ListItemButton from '@mui/material/ListItemButton';

import { MenuItem } from '@/models';

import { useAdminLayout } from '../../provider';

type Props = PropsWithChildren & Pick<MenuItem, 'href' | 'id'>;
const MenuListItemButton: React.FC<Props> = ({ children, href, id }) => {
  const pathname = usePathname();
  const isActive = !!(href && pathname?.startsWith(href));
  const { menuItemSelected, toggleMenuItem } = useAdminLayout();

  const handleClick = useCallback(() => {
    toggleMenuItem(id);
  }, [id, toggleMenuItem]);

  const conditionalProps = href
    ? { component: NextLink, prefetch: false, href }
    : { onClick: handleClick };

  return (
    <ListItemButton {...conditionalProps} selected={menuItemSelected === id || isActive}>
      {children}
    </ListItemButton>
  );
};

export default MenuListItemButton;
