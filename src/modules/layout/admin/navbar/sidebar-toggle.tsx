'use client';

import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import { useAdminLayout } from '../provider';

type Props = Omit<IconButtonProps, 'onClick'>;

const SidebarToggle = React.forwardRef<HTMLButtonElement, Props>(
  ({ color = 'inherit', edge = 'start', sx, ...props }, ref) => {
    const { toggleSidebar } = useAdminLayout();
    return (
      <IconButton
        color={color}
        edge={edge}
        onClick={toggleSidebar}
        ref={ref}
        sx={{ mr: 2, display: { md: 'none' }, ...sx }}
        {...props}
      >
        <MenuIcon />
      </IconButton>
    );
  },
);

SidebarToggle.displayName = 'SidebarToggle';

export default SidebarToggle;
