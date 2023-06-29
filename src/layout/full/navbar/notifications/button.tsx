'use client';

import { Icon, IconButton, MenuButton } from '@chakra-ui/react';

import { NotificationIcon } from '@/m/shared/icons';

const NotificationsMenuButton: React.FC = () => {
  return (
    <MenuButton
      aria-label="Notifications Menu"
      as={IconButton}
      colorScheme="accent"
      icon={<Icon as={NotificationIcon} boxSize="5" fill="current" />}
      rounded="full"
      shadow="md"
    />
  );
};

export { NotificationsMenuButton };
