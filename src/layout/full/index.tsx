import { useDisclosure } from '@chakra-ui/hooks';
import { PropsWithChildren } from 'react';

import { PrivateRoute } from '@m/auth';

import Layout from './layout';
import { LayoutProvider } from './provider';

const FullLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <LayoutProvider>
    <PrivateRoute>
      <Layout>{children}</Layout>
    </PrivateRoute>
  </LayoutProvider>
);

export { useLayout } from './provider';

export default FullLayout;
