import 'server-only';

import { PropsWithChildren } from 'react';

import SettingsNav from '@/m/layout/admin/settings-nav';

export const revalidate = 0;
const Layout: React.FC<PropsWithChildren> = async ({ children }) => {
  return (
    <>
      <SettingsNav />
      {children}
    </>
  );
};

export default Layout;
