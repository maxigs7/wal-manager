import { PropsWithChildren } from 'react';

import { AppName, Wrapper } from '@/layout/auth';

const AuthRootLayout = async ({ children }: PropsWithChildren) => {
  return (
    <Wrapper>
      <AppName />
      {children}
    </Wrapper>
  );
};

export default AuthRootLayout;
