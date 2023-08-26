'use client';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { MenuItem } from '@/models';

import { useAdminLayout } from '../../provider';

const MenuListItemToggle: React.FC<Pick<MenuItem, 'id' | 'subItems'>> = ({ id, subItems }) => {
  const { menuItemSelected } = useAdminLayout();

  if (!subItems?.length) return null;
  if (id === menuItemSelected) {
    return <ExpandLess />;
  }
  return <ExpandMore />;
};

export default MenuListItemToggle;
