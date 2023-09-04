import 'server-only';

import { PropsWithChildren } from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Navbar from '@/m/layout/admin/navbar';
import { AdminLayoutProvider } from '@/m/layout/admin/provider';
import Sidebar from '@/m/layout/admin/sidebar';

import { ModalProvider } from './create-modals';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AdminLayoutProvider>
      <ModalProvider>
        <div className="flex">
          <Navbar />
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - 250px)` } }}>
            <Toolbar />
            <Box sx={{ p: 3 }}>{children}</Box>
          </Box>
        </div>
      </ModalProvider>
    </AdminLayoutProvider>
  );
};

export default Layout;
