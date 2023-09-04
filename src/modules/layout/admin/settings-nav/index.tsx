import 'server-only';

import { SidebarMenuKeys } from '@/i18n';
import { getScopedI18n } from '@/i18n/server';
import { MenuItem } from '@/models';

import Tab from './tab';
import SettingsTabs from './tabs';

const SettingsNav: React.FC = async () => {
  const menu = await import('@/m/shared/menu/main.json').then((m) => m.default as MenuItem[]);
  const menuT = await getScopedI18n('menu.sidebar');
  const settings =
    menu
      .find((m) => m.id === 'settings')
      ?.subItems?.map((setting: MenuItem) => ({
        ...setting,
        label: menuT(setting.id as SidebarMenuKeys),
      })) || [];

  return (
    <SettingsTabs menu={settings}>
      {settings.map((m) => (
        <Tab key={m.id as string} {...m} />
      ))}
    </SettingsTabs>
  );
};

export default SettingsNav;
