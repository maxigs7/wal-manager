import React from 'react';

import { HeaderTags, Title } from '@app/modules/common';

import { SidebarMenuItem } from './item';
import { mainRoutes } from './menu-data';

const styles = {
  menuWrapper: 'my-3',
  title: 'text-xs uppercase text-gray-500 font-semibold pl-3',
};

export const SidebarMenu: React.FC<{ pathname: string }> = React.memo(({ pathname }) => (
  <>
    <Title className={styles.title} tag={HeaderTags.H6}>
      Principal
    </Title>
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
