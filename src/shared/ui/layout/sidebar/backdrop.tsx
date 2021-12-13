import React from 'react';

import { Box } from '@chakra-ui/react';

interface IProps {
  closeSidebar(): void;
  isSidebarOpen: boolean;
}

export const Backdrop: React.FC<IProps> = React.memo(({ closeSidebar, isSidebarOpen }) => (
  <Box
    aria-hidden="true"
    bg="gray.900"
    display={{ lg: 'none' }}
    h={isSidebarOpen ? 'full' : ''}
    onClick={closeSidebar}
    opacity={isSidebarOpen ? 0.3 : 0}
    pointerEvents={isSidebarOpen ? 'auto' : 'none'}
    position="fixed"
    transition="opacity 0.2s"
    w={isSidebarOpen ? 'full' : ''}
    zIndex="40"
  />
));
