import 'server-only';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { getScopedI18n } from '@/i18n/server';

import { SIDEBAR_WIDTH } from '../constants';
import RightSide from './right-side';
import SidebarToggle from './sidebar-toggle';

const Navbar: React.FC = async () => {
  const tCommon = await getScopedI18n('common');
  return (
    <AppBar
      color="transparent"
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        ml: { md: `${SIDEBAR_WIDTH}px` },
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <SidebarToggle aria-label={tCommon('sidebar.open')} />

        <RightSide />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
