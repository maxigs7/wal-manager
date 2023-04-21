import React from 'react';

import { Backdrop } from './backdrop';
// import { Footer } from './footer';
import { Header } from './header';
import { SidebarManager } from './manager';
import { Menu } from './menu';
import { SidebarWrapper } from './wrapper';

const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <Backdrop />

      <SidebarManager>
        <Header />
        <Menu />
        {/* <Footer /> */}
      </SidebarManager>
    </SidebarWrapper>
  );
};

export { Sidebar };
