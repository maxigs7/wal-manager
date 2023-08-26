'use client';

import { PropsWithChildren } from 'react';

import MuiDrawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { SIDEBAR_WIDTH } from '../constants';
import { useAdminLayout } from '../provider';

const Drawer: React.FC<PropsWithChildren> = ({ children }) => {
  const { isSidebarOpen, closeSidebar } = useAdminLayout();

  const theme = useTheme();
  const isPermanent = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <MuiDrawer
      anchor="left"
      onClose={closeSidebar}
      open={isSidebarOpen || isPermanent}
      variant={isPermanent ? 'permanent' : 'temporary'}
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      {children}
    </MuiDrawer>
  );
};

export default Drawer;
