import React from 'react';

import { Flex, IconButton } from '@chakra-ui/react';

import { Icon } from '@shared';

import { UserMenu } from './user-menu';

interface IProps {
  signOut(): Promise<void>;
  toggleSidebar(): void;
  userName: string;
  userPhotoUrl?: string;
}

export const Navbar: React.FC<IProps> = ({ signOut, toggleSidebar, userName, userPhotoUrl }) => (
  <Flex
    align="center"
    as="header"
    bg="white"
    boxShadow="md"
    h="16"
    justify="space-between"
    pos="sticky"
    px={{ base: 4, sm: 6, lg: 8 }}
    top="0"
    zIndex="10"
  >
    {/* Header: Left side */}
    <Flex align="center" h="full">
      {/* Hamburger button */}
      <IconButton
        aria-controls="sidebar"
        aria-label="Open Sidebar"
        display={{ lg: 'none' }}
        icon={<Icon fill="current" icon="bars" />}
        onClick={toggleSidebar}
        variant="ghost"
      />
    </Flex>
    {/* Header: Right side */}
    <Flex align="center" h="full">
      {/* <SearchModal />
            <Notifications />
            <Help /> */}
      {/*  Divider */}
      <UserMenu signOut={signOut} userName={userName} userPhotoUrl={userPhotoUrl} />
    </Flex>
  </Flex>
);
