import React from 'react';

import { SidebarMenuItem } from './item';
import { mainRoutes } from './menu-data';

const styles = {
  menuWrapper: 'my-3',
  title: 'text-xs uppercase text-gray-500 font-semibold pl-3',
};

export const SidebarMenu: React.FC<{ pathname: string }> = React.memo(({ pathname }) => (
  <>
    <h3 className={styles.title}>Main</h3>
    <ul className={styles.menuWrapper}>
      {mainRoutes.map((item, index) => (
        <SidebarMenuItem {...item} isActive={pathname === item.path} key={index} />
      ))}
    </ul>

    {/* <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">Admin</h3>
    <ul className="my-3">
      {adminRoutes.map((item, index) => (
        <SidebarMenuItem {...item} isActive={pathname === item.path} key={index} />
      ))}
    </ul> */}
  </>
));
