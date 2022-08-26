import { useCallback } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import { useDisclosure } from '@chakra-ui/hooks';

import { LayoutFull } from '@layout';
import { PrivateRoute, useSignOut, useUser } from '@m/auth';

import { routes } from './admin';

const Layout: React.FC = () => {
  const element = useRoutes(routes);
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { user } = useUser();
  const { mutateAsync } = useSignOut();
  const signOutHandler = useCallback(async () => {
    await mutateAsync();
  }, []);

  return (
    <PrivateRoute>
      <LayoutFull
        closeSidebar={onClose}
        isSidebarOpen={isOpen}
        signOut={signOutHandler}
        toggleSidebar={onToggle}
        userName={user?.email || ''}
        userPhotoUrl={user?.user_metadata?.photoURL}
      >
        {element}
        <Outlet />
      </LayoutFull>
    </PrivateRoute>
  );
};

export default Layout;
