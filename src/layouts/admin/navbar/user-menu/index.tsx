import React from 'react';
import { NavLink } from 'react-router-dom';

import { Avatar, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux';
import { selectUser } from '@app/stores/auth';
import { LOGOUT_REQUEST } from '@app/stores/auth/actions';
import { Icon } from '@lib/chakra-ui';

export const UserMenu: React.FC = React.memo(() => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const signOutHandler = () => {
    dispatch(LOGOUT_REQUEST());
  };

  return (
    <Menu gutter={0} placement="bottom-end" isLazy>
      <MenuButton h="full">
        <HStack align="center" as="span" justify="center">
          <Avatar size="sm" src={user?.photoURL} />
          <Text as="span" display={['none', 'inline']}>
            {user?.displayName}
          </Text>
          <Icon icon="chevron-down" />
        </HStack>
      </MenuButton>
      <MenuList top={-10}>
        <MenuItem as={NavLink} to="/settings" exact>
          Profile
        </MenuItem>
        <MenuItem onClick={signOutHandler}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
});
