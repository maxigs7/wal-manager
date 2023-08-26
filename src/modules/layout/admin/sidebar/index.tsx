import 'server-only';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { SidebarMenuKeys } from '@/i18n';
import { getScopedI18n } from '@/i18n/server';
import { MenuItem } from '@/models';

import { SIDEBAR_WIDTH } from '../constants';
import Drawer from './drawer';
import MenuList from './menu-list';
import TopBar from './top-bar';

const Sidebar: React.FC = async () => {
  const menu = await import('@/m/shared/menu/main.json').then((m) => m.default as MenuItem[]);
  const menuT = await getScopedI18n('menu.sidebar');
  const mapWithLabel = (m: MenuItem): MenuItem => {
    const subItems = m.subItems ? m.subItems.map(mapWithLabel) : [];
    return { ...m, label: menuT(m.id as SidebarMenuKeys), subItems };
  };

  return (
    <Box component="nav" sx={{ width: { md: SIDEBAR_WIDTH }, flexShrink: { md: 0 } }}>
      <Drawer>
        <TopBar />
        <Divider />
        <MenuList menu={menu.map(mapWithLabel)} />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
