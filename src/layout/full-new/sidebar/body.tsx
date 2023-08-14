import 'server-only';

import React from 'react';

import { SidebarMenuKeys } from '@/i18n';
import { getScopedI18n } from '@/i18n/server';
import { classnames } from '@/lib/classnames';
import { MenuItem } from '@/models';

import { SidebarMenuItem } from './menu-item';

const SidebarBody: React.FC = async () => {
  const t = await getScopedI18n('menu.sidebar');
  const menu: MenuItem[] = await import('@/m/shared/menu/main.json').then((obj) => obj.default);

  return (
    <div className={classnames('flex flex-col gap-2 mt-6')}>
      {menu.map((item) => (
        <SidebarMenuItem {...item} key={item.id} title={t(item.href as SidebarMenuKeys)} />
      ))}
    </div>
  );
};

export { SidebarBody };
