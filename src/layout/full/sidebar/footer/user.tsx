import { Avatar, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import NavLink from 'next/link';
import React from 'react';

import { useUser } from '@m/auth';
import { Icon } from '@shared';

import { SIDEBAR_WIDTH } from '../../constants';

const User: React.FC = () => {
  const { user } = useUser();

  const userPhotoUrl = user?.user_metadata?.photoURL;
  // const { mutateAsync } = useSignOut();
  // const signOutHandler = useCallback(async () => {
  //   await mutateAsync();
  // }, [mutateAsync]);
  // const signOutHandler = async () => {
  //   await signOut();
  // };

  return (
    <Flex align="center" justify="center" py="3">
      <Avatar mr="3" size="sm" src={userPhotoUrl} />
      <Text as="span" display={['none', 'inline']}>
        {user?.email || ''}
      </Text>
    </Flex>
  );
};

User.displayName = 'User';

export { User };
