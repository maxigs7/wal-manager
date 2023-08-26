import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { MenuItem, getIcon } from '@/models';

import MenuListItemButton from './menu-list-item-button';
import MenuListItemToggle from './menu-list-item-toggle';
import SubMenuListItem from './sub-menu-list-item';

const MenuListItem: React.FC<MenuItem> = ({ href, id, label, subItems }) => {
  const Icon = getIcon(id);

  return (
    <>
      <MenuListItemButton href={href} id={id}>
        {Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={label} />
        <MenuListItemToggle id={id} subItems={subItems} />
      </MenuListItemButton>
      {!!subItems?.length && <SubMenuListItem id={id} subItems={subItems} />}
    </>
  );
};

export default MenuListItem;
