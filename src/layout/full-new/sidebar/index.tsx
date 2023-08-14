import 'server-only';

import React from 'react';

import { SidebarBody } from './body';
import { SidebarContainer } from './container';
import { SidebarHeader } from './header';
import { SidebarOverlay } from './overlay';
import { SidebarWrapper } from './wrapper';

const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <SidebarOverlay />
      <SidebarContainer>
        <SidebarHeader />
        <div className="flex flex-col justify-between h-full">
          <SidebarBody />
        </div>
      </SidebarContainer>
    </SidebarWrapper>
  );
};

export { Sidebar };
