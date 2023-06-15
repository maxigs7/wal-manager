import { AnimatePresence } from '@/lib/framer-motion';
import { IconType, MenuItem as MenuItemModel } from '@/models';

import { MenuContainer } from './container';
import { MenuItem } from './item';

export const Menu: React.FC = async () => {
  const menu: MenuItemModel[] = await import('@/assets/menu-settings.json').then(
    (obj) => obj.default,
  );

  return (
    <AnimatePresence>
      <MenuContainer>
        {menu.map((item) => (
          <MenuItem {...item} key={item.id} icon={item.icon as IconType} />
        ))}
      </MenuContainer>
    </AnimatePresence>
  );
};
