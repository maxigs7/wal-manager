import 'server-only';

import { PropsWithChildren } from 'react';

import { ContentWrapper, MainContent, Navbar, Sidebar, Wrapper } from '@/layout/full';
import { LayoutProvider } from '@/layout/full/provider';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutProvider>
      <Wrapper>
        <Sidebar />
        <ContentWrapper>
          <Navbar />
          <MainContent>{children}</MainContent>
        </ContentWrapper>
      </Wrapper>
    </LayoutProvider>
  );
};

export default Layout;
