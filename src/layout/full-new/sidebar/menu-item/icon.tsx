import React, { ComponentProps } from 'react';

import { IconType, MenuItem, getIcon } from '@/models';

type Props = {
  icon: MenuItem['icon'];
} & ComponentProps<'svg'>;

export const MenuItemIcon: React.FC<Props> = ({ className, icon }) => {
  const Icon = getIcon(icon as IconType);

  if (!Icon) return null;

  return <Icon className={className} />;
};
