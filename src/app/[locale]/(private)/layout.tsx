import 'server-only';

import { PropsWithChildren } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Navbar from '@/m/layout/admin/navbar';
import { AdminLayoutProvider } from '@/m/layout/admin/provider';
import Sidebar from '@/m/layout/admin/sidebar';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AdminLayoutProvider>
      <div className="flex">
        <Navbar />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 250px)` } }}>
          {children}
        </Box>
      </div>
    </AdminLayoutProvider>
  );
};

export default Layout;
