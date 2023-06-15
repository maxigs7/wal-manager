'use client';

import { Avatar, Button, MenuButton } from '@chakra-ui/react';

import { useUser } from '@/m/auth/providers';

const UserMenuButton: React.FC = () => {
  const { user } = useUser();

  const userPhotoUrl = user?.user_metadata?.photoURL;

  return (
    <MenuButton
      aria-label="User Menu"
      as={Button}
      colorScheme="accent"
      fontSize="sm"
      leftIcon={<Avatar bg="primary.400" name={user?.email} size="xs" src={userPhotoUrl} />}
      rounded="3xl"
      shadow="md"
      textTransform="none"
    >
      {user?.email}
    </MenuButton>
  );
};

export { UserMenuButton };
