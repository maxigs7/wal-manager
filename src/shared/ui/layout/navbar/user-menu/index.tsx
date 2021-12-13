import React from 'react';
import { NavLink } from 'react-router-dom';

import { Avatar, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';

import { Icon } from '@shared';

interface IProps {
  signOut(): Promise<void>;
  userName: string;
  userPhotoUrl?: string;
}

export const UserMenu: React.FC<IProps> = React.memo(({ signOut, userName, userPhotoUrl }) => {
  const signOutHandler = async () => {
    await signOut();
  };

  return (
    <Menu gutter={0} placement="bottom-end" isLazy>
      <MenuButton h="full">
        <HStack align="center" as="span" justify="center">
          <Avatar size="sm" src={userPhotoUrl} />
          <Text as="span" display={['none', 'inline']}>
            {userName}
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
