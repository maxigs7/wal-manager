import 'server-only';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LogoIcon from '@/m/shared/icons/logo';

const TopBar: React.FC = () => {
  return (
    <Toolbar sx={{ justifyContent: 'center' }}>
      <Typography
        align="center"
        alignItems="center"
        component="div"
        display="flex"
        fontSize="1.25rem"
        gap="0.5rem"
        justifyContent="center"
        textTransform="uppercase"
        variant="h2"
      >
        <LogoIcon />
        Wal Manager
      </Typography>
    </Toolbar>
  );
};

export default TopBar;
