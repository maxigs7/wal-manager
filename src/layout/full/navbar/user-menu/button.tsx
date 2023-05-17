'use client';

import { Avatar, IconButton, MenuButton } from '@chakra-ui/react';

import { useUser } from '@/modules/auth/providers';

const UserMenuButton: React.FC = () => {
  const { user } = useUser();

  const userPhotoUrl = user?.user_metadata?.photoURL;

  return (
    <MenuButton
      aria-label="User Menu"
      as={IconButton}
      icon={<Avatar name={user?.email} size="sm" src={userPhotoUrl} />}
      variant="ghost"
    />
  );
};

export { UserMenuButton };
