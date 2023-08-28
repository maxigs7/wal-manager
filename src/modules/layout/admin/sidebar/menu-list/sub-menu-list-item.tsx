'use client';

import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

import { MenuItem } from '@/models';

import { useAdminLayout } from '../../provider';
import MenuListItem from './menu-list-item';

const SubMenuListItem: React.FC<Required<Pick<MenuItem, 'id' | 'subItems'>>> = ({
  id,
  subItems,
}) => {
  const { menuItemSelected } = useAdminLayout();

  return (
    <Collapse in={menuItemSelected === id} timeout="auto" unmountOnExit>
      <List
        component="div"
        sx={{
          mt: -0.5,
        }}
        disablePadding
      >
        {subItems.map((item) => (
          <MenuListItem key={item.id} {...item} isSubItem={true} />
        ))}
      </List>
    </Collapse>
  );
};

export default SubMenuListItem;
