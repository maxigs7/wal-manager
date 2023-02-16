import 'server-only';

import { PropsWithChildren } from 'react';

import { LayoutProvider } from '@/layout/full';
import FullLayout from '@/layout/full/layout';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutProvider>
      <FullLayout>{children}</FullLayout>
    </LayoutProvider>
  );
};

export default Layout;
