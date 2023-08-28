'use client';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { alpha } from '@mui/material/styles';

import { MenuItem, getIcon } from '@/models';

import MenuListItemButton from './menu-list-item-button';
import MenuListItemToggle from './menu-list-item-toggle';
import SubMenuListItem from './sub-menu-list-item';

type MenuExtended = MenuItem & {
  isSubItem?: boolean;
};

const MenuListItem: React.FC<MenuExtended> = ({ href, id, isSubItem, label, subItems }) => {
  const Icon = getIcon(id);

  return (
    <>
      <MenuListItemButton
        href={href}
        id={id}
        sx={{
          borderBottomRightRadius: 50,
          borderTopRightRadius: 50,
          mr: 1,
          mb: isSubItem ? undefined : 0.5,
          py: 0.5,

          '&.Mui-selected, &.Mui-selected:hover': {
            bgcolor: (theme) =>
              !subItems?.length || isSubItem
                ? theme.palette.secondary.light
                : alpha(theme.palette.secondary.light, 0.5),

            boxShadow: 2,
          },

          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.secondary.light, 0.5),
          },
        }}
      >
        {Icon && (
          <ListItemIcon>
            <Icon sx={{ color: 'primary.contrastText' }} />
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
