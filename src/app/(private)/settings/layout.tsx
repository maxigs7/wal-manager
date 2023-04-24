import 'server-only';

import { PropsWithChildren } from 'react';

import { ContentWrapper, Menu, Wrapper } from '@/layout/settings';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <Menu />
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
};

export default Layout;
