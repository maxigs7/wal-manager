import 'server-only';

import List from '@mui/material/List';

import { MenuItem } from '@/models';

import MenuListItem from './menu-list-item';

const MenuList: React.FC<{ menu: MenuItem[] }> = ({ menu }) => {
  return (
    <List component="nav">
      {menu.map((item) => (
        <MenuListItem key={item.id} {...item} />
      ))}
    </List>
  );
};

export default MenuList;
