import { useDisclosure } from '@chakra-ui/hooks';
import { PropsWithChildren } from 'react';

import { PrivateRoute } from '@m/auth';

import Layout from './layout';

const FullLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <PrivateRoute>
      <Layout closeSidebar={onClose} isSidebarOpen={isOpen} toggleSidebar={onToggle}>
        {children}
      </Layout>
    </PrivateRoute>
  );
};

export default FullLayout;
