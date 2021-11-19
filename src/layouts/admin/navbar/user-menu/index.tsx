import React from 'react';
import { NavLink } from 'react-router-dom';

import { Avatar, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';

import { useAuthApi } from '@api';
import { Icon } from '@lib/chakra-ui';
import { useUser } from '@lib/supabase';

export const UserMenu: React.FC = React.memo(() => {
  const { user } = useUser();
  const { signOut } = useAuthApi();

  const signOutHandler = async () => {
    await signOut.mutate();
  };

  return (
    <Menu gutter={0} placement="bottom-end" isLazy>
      <MenuButton h="full">
        <HStack align="center" as="span" justify="center">
          <Avatar size="sm" src={user?.user_metadata?.photoURL} />
          <Text as="span" display={['none', 'inline']}>
            {user?.email}
          </Text>
          <Icon icon="chevron-down" />
        </HStack>
      </MenuButton>
      <MenuList top={-10}>
        <MenuItem as={NavLink} to="/settings" end>
          Profile
        </MenuItem>
        <MenuItem onClick={signOutHandler}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
});
