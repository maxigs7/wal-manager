'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useSignOut } from '@/m/auth/query';
import { routes } from '@/routes';

type Props = {
  email: string;
};

const UserMenu: React.FC<Props> = ({ email }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { mutateAsync } = useSignOut();

  const signOutHandler = async () => {
    await mutateAsync();
    router.push(routes.auth.signIn);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="account-menu"
        aria-haspopup="true"
        onClick={handleMenu}
        sx={{ p: 0 }}
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        onClose={handleClose}
        open={Boolean(anchorEl)}
        sx={{ mt: '45px' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
      >
        <MenuItem>{email} 👋🏻</MenuItem>
        <Divider />
        <MenuItem onClick={signOutHandler}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
