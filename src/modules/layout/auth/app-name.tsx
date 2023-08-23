import 'server-only';

import Typography from '@mui/material/Typography';

import LogoIcon from '@/m/shared/icons/logo';

const AppName: React.FC = () => {
  return (
    <Typography
      align="center"
      alignItems="center"
      display="flex"
      fontSize="2rem"
      gap="0.5rem"
      justifyContent="center"
      textTransform="uppercase"
      variant="h2"
    >
      <LogoIcon />
      Wal Manager
    </Typography>
  );
};

export default AppName;
