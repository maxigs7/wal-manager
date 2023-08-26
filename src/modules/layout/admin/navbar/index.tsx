import 'server-only';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { getScopedI18n } from '@/i18n/server';

import { SIDEBAR_WIDTH } from '../constants';
import SidebarToggle from './sidebar-toggle';

const Navbar: React.FC = async () => {
  const tCommon = await getScopedI18n('common');
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        ml: { md: `${SIDEBAR_WIDTH}px` },
      }}
    >
      <Toolbar>
        <SidebarToggle aria-label={tCommon('sidebar.open')} />
        <Typography component="div" variant="h6" noWrap>
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
