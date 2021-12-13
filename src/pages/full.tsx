import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';

import { useDisclosure } from '@chakra-ui/hooks';

import { PrivateRoute, useSignOut, useUser } from '@entities';
import { lazyImport } from '@shared';

const { LayoutFull } = lazyImport(
  () => import(/* webpackChunkName: 'full.layout' */ '@shared'),
  'LayoutFull',
);

export const LayoutFullWrapper: React.FC = () => {
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
        <Outlet />
      </LayoutFull>
    </PrivateRoute>
  );
};
