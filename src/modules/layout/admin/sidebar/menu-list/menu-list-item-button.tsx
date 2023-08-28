'use client';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';

import { MenuItem } from '@/models';

import { useAdminLayout } from '../../provider';

type Props = Pick<MenuItem, 'href' | 'id'> &
  Omit<ListItemButtonProps, 'component' | 'onClick' | 'selected'>;
const MenuListItemButton: React.FC<Props> = ({ children, href, id, ...props }) => {
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
    <ListItemButton {...conditionalProps} selected={menuItemSelected === id || isActive} {...props}>
      {children}
    </ListItemButton>
  );
};

export default MenuListItemButton;
