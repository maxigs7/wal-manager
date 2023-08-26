'use client';

import MenuIcon from '@mui/icons-material/Menu';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import { useAdminLayout } from '../provider';

const SidebarToggle: React.FC<Omit<IconButtonProps, 'onClick'>> = ({
  color = 'inherit',
  edge = 'start',
  sx,
  ...props
}) => {
  const { toggleSidebar } = useAdminLayout();
  return (
    <IconButton
      color={color}
      edge={edge}
      onClick={toggleSidebar}
      sx={{ mr: 2, display: { md: 'none' }, ...sx }}
      {...props}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default SidebarToggle;
