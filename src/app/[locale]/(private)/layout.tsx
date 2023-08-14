import 'server-only';

import { PropsWithChildren } from 'react';

import { ContentWrapper } from '@/layout/full-new/content-wrapper';
import { Navbar } from '@/layout/full-new/navbar';
import { Sidebar } from '@/layout/full-new/sidebar';
import { SidebarProvider } from '@/layout/full-new/sidebar/provider';
import { Wrapper } from '@/layout/full-new/wrapper';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <Wrapper>
        <Sidebar />
        <ContentWrapper>
          <Navbar />
          {children}
        </ContentWrapper>
      </Wrapper>
    </SidebarProvider>
  );
};

export default Layout;
