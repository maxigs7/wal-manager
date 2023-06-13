'use client';

import { Icon, IconButton, MenuButton } from '@chakra-ui/react';

import { BellIcon } from '@/lib/heroicons';

const NotificationsMenuButton: React.FC = () => {
  return (
    <MenuButton
      aria-label="Notifications Menu"
      as={IconButton}
      icon={<Icon as={BellIcon} boxSize="6" fill="current" />}
      variant="ghost"
    />
  );
};

export { NotificationsMenuButton };
