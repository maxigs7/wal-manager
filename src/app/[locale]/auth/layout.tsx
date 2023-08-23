import 'server-only';

import { PropsWithChildren } from 'react';

import AppName from '@/m/layout/auth/app-name';
import PageContainer from '@/m/layout/auth/page-container';

const AuthRootLayout = ({ children }: PropsWithChildren) => {
  return (
    <PageContainer>
      <AppName />

      {children}
    </PageContainer>
  );
};

export default AuthRootLayout;
